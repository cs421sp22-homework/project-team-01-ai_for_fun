# Text to speech model set up
# Download package
> pip install TTS

> sudo apt-get espeak
# Download models
> gdown --id 1dntzjWFg7ufWaTaFy80nRz-Tu02xWZos -O tts_model.pth.tar
> 
> gdown --id 18CQ6G6tBEOfvCHlPqP8EBI4xWbrr9dBc -O config.json

tts_model.pth.tar is the tar package with all the tts models.

cofig.json contain the fune tuned hyperparetmers of the models.

>gdown --id 1Ty5DZdOc0F7OTGj9oJThYbL5iVu_2G0K -O vocoder_model.pth.tar
>
>gdown --id 1Rd0R_nRCrbjEdpOwq6XwZAktvugiBvmu -O config_vocoder.json
>
>gdown --id 11oY3Tv0kQtxK_JPgxrfesa99maVXHNxU -O scale_stats.npy

vocoder_model.pth.tar is the tar package with all the vocoder models.

config_vocoder.json contain the fune tuned hyperparetmers of the  vocoder models. 
