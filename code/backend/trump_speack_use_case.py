from utils import hparams as hp

from pydub import AudioSegment

from tensorflow.python.client import device_lib
device_lib.list_local_devices()

import os

from pathlib import Path
import time

speech_file = open("speech.txt","a") 
speech_file.write("Nobody knows Software engineering better than me")
speech_file.close() 

player = []

# def playAllAudio():
  
#   out_path = "../output/"
#   files = os.listdir(out_path)
#   latest_file = max(files, key=os.path.getctime)
#   # player = [play(out_path + files[0])]
#   playerIndex = 0
#   print()
#   for x in range(0,len(files)):
#     if Path(out_path + files[x]).suffix == '.wav':
#       print(files[x])
#       player.append(play(out_path + files[x]))
#       playerIndex+=1
#       time.sleep(1)
#       IPython.display.display(player[playerIndex])
#       time.sleep(1)
#       print()
path = "/TrumpSpeak/model_outputs/ljspeech_tts.forward/"
speech = "Nobody"
model_iteration = 80
talking_speed = 0.9 
modelWeights = str(model_iteration) + "K.pyt"
playerIndex = 0

cmd="python gen_forward.py --alpha %d --input_text %s --hp_file 'pretrained/pretrained_hparams.py' --tts_weights 'checkpoints/ljspeech_tts.forward/%s' wavernn --voc_weights 'pretrained/wave_800K.pyt' --batched --target=4096 --overlap=32"%(talking_speed, speech, modelWeights) 

os.system(cmd)