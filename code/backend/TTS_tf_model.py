import os
import torch
import time
import IPython
from scipy.io.wavfile import write
import numpy as np

from TTS.tts.tf.utils.generic_utils import setup_model
from TTS.tts.tf.utils.io import load_checkpoint
from TTS.utils.io import load_config
from TTS.tts.utils.text.symbols import symbols, phonemes
from TTS.utils.audio import AudioProcessor
from TTS.tts.utils.synthesis import synthesis

def tts(model, text, CONFIG, p):
    t_1 = time.time()
    waveform, alignment, mel_spec, mel_postnet_spec, stop_tokens, inputs = synthesis(model, text, CONFIG, use_cuda, ap, speaker_id, style_wav=None,
                                                                             truncated=False, enable_eos_bos_chars=CONFIG.enable_eos_bos_chars,
                                                                             backend='tf')
    waveform = vocoder_model.inference(torch.FloatTensor(mel_postnet_spec.T).unsqueeze(0))
    waveform = waveform.numpy()[0, 0]
    rtf = (time.time() - t_1) / (len(waveform) / ap.sample_rate)
    tps = (time.time() - t_1) / len(waveform)
    print(waveform.shape)
    print(" > Run-time: {}".format(time.time() - t_1))
    print(" > Real-time factor: {}".format(rtf))
    print(" > Time per step: {}".format(tps))
    IPython.display.display(IPython.display.Audio(waveform, rate=CONFIG.audio['sample_rate']))  
    return alignment, mel_postnet_spec, stop_tokens, waveform

# runtime settings
use_cuda = False

# model paths
TTS_MODEL = "dataset_analysis/tts_model.pkl"
TTS_CONFIG = "dataset_analysis/config.json"
VOCODER_MODEL = "dataset_analysis/vocoder_model.pkl"
VOCODER_CONFIG = "dataset_analysis/config_vocoder.json"

# load configs
TTS_CONFIG = load_config(TTS_CONFIG)
VOCODER_CONFIG = load_config(VOCODER_CONFIG)

# load the audio processor
TTS_CONFIG.audio['stats_path'] = 'dataset_analysis/scale_stats.npy'
ap = AudioProcessor(**TTS_CONFIG.audio)      

speaker_id = None
speakers = []

# load the model
num_chars = len(phonemes) if TTS_CONFIG.use_phonemes else len(symbols)
model = setup_model(num_chars, len(speakers), TTS_CONFIG)
model.build_inference()
# model = load_checkpoint(model, TTS_MODEL)
model.decoder.set_max_decoder_steps(1000)

from TTS.vocoder.tf.utils.generic_utils import setup_generator
from TTS.vocoder.tf.utils.io import load_checkpoint

# LOAD VOCODER MODEL
vocoder_model = setup_generator(VOCODER_CONFIG)
vocoder_model.build_inference()
vocoder_model = load_checkpoint(vocoder_model, VOCODER_MODEL)
vocoder_model.inference_padding = 0

ap_vocoder = AudioProcessor(**VOCODER_CONFIG['audio'])   

sentence =  "We will pass our object orient software engineering class."
align, spec, stop_tokens, wav = tts(model, sentence, TTS_CONFIG, ap)
write("my_wav.wav", 44100, wav.astype(np.int16))

