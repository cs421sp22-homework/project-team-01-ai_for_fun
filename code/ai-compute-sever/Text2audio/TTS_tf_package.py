import os
import torch
import time
import IPython
from scipy.io.wavfile import write
import numpy as np

# from TTS.tts.tf.utils.generic_utils import setup_model
# from TTS.tts.tf.utils.io import load_checkpoint
# from TTS.utils.io import load_config
# from TTS.tts.utils.text.symbols import symbols, phonemes
# from TTS.utils.audio import AudioProcessor
# from TTS.tts.utils.synthesis import synthesis
# from TTS.vocoder.tf.utils.generic_utils import setup_generator
# from TTS.vocoder.tf.utils.io import load_checkpoint

from TTS.utils.generic_utils import setup_model
from TTS.utils.io import load_config
from TTS.utils.text.symbols import symbols, phonemes
from TTS.utils.audio import AudioProcessor
from TTS.utils.synthesis import synthesis
use_cuda = False
speaker_id = None
speakers = []

def tts(filename, model, text, CONFIG, use_cuda, ap, vocoder_model, use_gl, figures=True):
    t_1 = time.time()
    waveform, alignment, mel_spec, mel_postnet_spec, stop_tokens, inputs = synthesis(model, text, CONFIG, use_cuda, ap, speaker_id, style_wav=None,
                                                                             truncated=False, enable_eos_bos_chars=CONFIG.enable_eos_bos_chars)
    # mel_postnet_spec = ap._denormalize(mel_postnet_spec.T)
    if not use_gl:
        waveform = vocoder_model.inference(torch.FloatTensor(mel_postnet_spec.T).unsqueeze(0))
        waveform = waveform.flatten()
    if use_cuda:
        waveform = waveform.cpu()
    waveform = waveform.numpy()
    rtf = (time.time() - t_1) / (len(waveform) / ap.sample_rate)
    tps = (time.time() - t_1) / len(waveform)
    print(waveform.shape)
    print(" > Run-time: {}".format(time.time() - t_1))
    print(" > Real-time factor: {}".format(rtf))
    print(" > Time per step: {}".format(tps))
    # IPython.display.display(IPython.display.Audio(waveform, rate=CONFIG.audio['sample_rate']))
    write(filename,CONFIG.audio['sample_rate'],waveform.astype(np.float32))
    return alignment, mel_postnet_spec, stop_tokens, waveform

def create_wav_tf(text,filename):
    """
    text: a string that contain the text that need to transform to speech
    write a wav file at the same dir 
    """

    # runtime settings
    
    
    # model paths
    TTS_MODEL = "./Text2audio/checkpoint_130000.pth.tar"
    TTS_CONFIG = "./Text2audio/config.json"
    VOCODER_MODEL = "./Text2audio/vocoder_model.pth.tar"
    VOCODER_CONFIG = "./Text2audio/config_vocoder.json"
    # load configs
    TTS_CONFIG = load_config(TTS_CONFIG)
    VOCODER_CONFIG = load_config(VOCODER_CONFIG)
    # load the audio processor
    TTS_CONFIG.audio['stats_path'] = './Text2audio/scale_stats.npy'
    ap = AudioProcessor(**TTS_CONFIG.audio)      

    speakers = []
    
    # load the model
    # num_chars = len(phonemes) if TTS_CONFIG.use_phonemes else len(symbols)
    # model = setup_model(num_chars, len(speakers), TTS_CONFIG)
    # model.build_inference()
    # model = load_checkpoint(model, TTS_MODEL)
    # model.decoder.set_max_decoder_steps(1000)
    # LOAD TTS MODEL
    # multi speaker
    speaker_id = None
    speakers = []

    # load the model
    num_chars = len(phonemes) if TTS_CONFIG.use_phonemes else len(symbols)
    model = setup_model(num_chars, len(speakers), TTS_CONFIG)

    # load model state
    cp = torch.load(TTS_MODEL, map_location=torch.device('cpu'))
    # load the model
    model.load_state_dict(cp['model'])
    if use_cuda:
        model.cuda()
    model.eval()

    # set model stepsize
    if 'r' in cp:
        model.decoder.set_r(cp['r'])

    

    # LOAD VOCODER MODEL
    # vocoder_model = setup_generator(VOCODER_CONFIG)
    # vocoder_model.build_inference()
    # vocoder_model = load_checkpoint(vocoder_model, VOCODER_MODEL)
    # vocoder_model.inference_padding = 0
    from TTS.vocoder.utils.generic_utils import setup_generator

    # LOAD VOCODER MODEL
    vocoder_model = setup_generator(VOCODER_CONFIG)
    vocoder_model.load_state_dict(torch.load(VOCODER_MODEL, map_location="cpu")["model"])
    vocoder_model.remove_weight_norm()
    vocoder_model.inference_padding = 0

    # ap_vocoder = AudioProcessor(**VOCODER_CONFIG['audio'])
    if use_cuda:
        vocoder_model.cuda()
    vocoder_model.eval()

    # ap_vocoder = AudioProcessor(**VOCODER_CONFIG['audio'])

    # sentence =  "We will pass our object orient software engineering class."
    # align, spec, stop_tokens, wav = tts(model, text, TTS_CONFIG, ap,vocoder_model)
    align, spec, stop_tokens, wav = tts(filename,model, text, TTS_CONFIG, use_cuda, ap, vocoder_model, use_gl=False, figures=True)
    return filename

