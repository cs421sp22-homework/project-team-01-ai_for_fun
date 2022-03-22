# Text to speech model set up
# Download package
> git clone https://github.com/mozilla/TTS

> pip install -e .

> sudo apt-get espeak
# Download models
> gdown https://drive.google.com/uc?id=1p7OSEEW_Z7ORxNgfZwhMy7IiLE1s0aH7 -O tts_model.pkl
> 
> gdown https://drive.google.com/uc?id=18CQ6G6tBEOfvCHlPqP8EBI4xWbrr9dBc -O config.json

tts_model.pth.tar is the tar package with all the tts models.

cofig.json contain the fune tuned hyperparetmers of the models.

>gdown https://drive.google.com/uc?id=1rHmj7CqD3Sfa716Y3ub_vpIBrQg_b1yF -O vocoder_model.pkl
>
>gdown https://drive.google.com/uc?id=1Rd0R_nRCrbjEdpOwq6XwZAktvugiBvmu -O config_vocoder.json
>
>gdown https://drive.google.com/uc?id=11oY3Tv0kQtxK_JPgxrfesa99maVXHNxU -O scale_stats.npy

vocoder_model.pth.tar is the tar package with all the vocoder models.

config_vocoder.json contain the fune tuned hyperparetmers of the  vocoder models. 

In the TTS_tf_model.py, please change the directories of model path loading form line 35-38 to location where you download these files.
