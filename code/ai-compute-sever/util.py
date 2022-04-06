from unicodedata import name
import boto3
import cv2
import numpy as np
import string
import random
from datetime import datetime
from urllib.request import urlopen
from moviepy.editor import VideoFileClip, AudioFileClip, concatenate_videoclips

ACCESS_ID = 'AKIAXRGYYT5KAP6UULMP'
ACCESS_KEY = 'hg8tUJkMiNVi+KO9qUr7vTL0ZUY5tIzfGSzHJqbr'

def generate_random_name(len):
    random.seed(datetime.now())
    res = ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase +
                             string.digits, k = len))
    res = res + '.jpg'
    return res

def generate_random_video_name(len):
    random.seed(datetime.now())
    res = ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase +
                             string.digits, k = len))
    res = res + '.mp4'
    return res


def url_to_image(url, readFlag=cv2.IMREAD_COLOR):
    resp = urlopen(url)
    image = np.asarray(bytearray(resp.read()), dtype="uint8")
    image = cv2.imdecode(image, readFlag)
    return image

def upload_image(img_dir):
    s3 = boto3.client('s3',aws_access_key_id=ACCESS_ID, aws_secret_access_key= ACCESS_KEY, region_name= 'us-east-1')
    name = generate_random_name(16)
    s3.upload_file(img_dir,'aifun', name)
    url = s3.generate_presigned_url('get_object',
                                Params={
                                    'Bucket': 'aifun',
                                    'Key': name,
                                },                                  
                                ExpiresIn=7200)
    return name, url

def upload_video(audio_dir):
    s3 = boto3.client('s3',aws_access_key_id=ACCESS_ID, aws_secret_access_key= ACCESS_KEY, region_name= 'us-east-1')
    name = generate_random_video_name(16)
    s3.upload_file(audio_dir,'aifun', name)
    url = s3.generate_presigned_url('get_object',
                                Params={
                                    'Bucket': 'aifun',
                                    'Key': name,
                                },
                                ExpiresIn=7200)
    return name, url

def download_image(img_name):
    s3 = boto3.client('s3',aws_access_key_id=ACCESS_ID, aws_secret_access_key= ACCESS_KEY, region_name= 'us-east-1')
    url = s3.generate_presigned_url('get_object',
                                Params={
                                    'Bucket': 'aifun',
                                    'Key': img_name,
                                },                                  
                                ExpiresIn=7200)
    print(url)
    #img = url_to_image(url)
    #cv2.imwrite(img_name, img)

def edit_video(person_id, audio_path, output_path):
    if person_id == "Trump":
        video_path = "TrumpSpeak/output/trump.mp4"
    else:
        video_path = "TrumpSpeak/output/noraml.mp4"
    video_clip = VideoFileClip(video_path)
    audio_clip = AudioFileClip(audio_path)
    video_duration = video_clip.duration
    audio_duration = audio_clip.duration
    if audio_duration <= video_duration:
        video_clip = video_clip.subclip(0, audio_duration)
    else:
        times = audio_duration / video_duration + 1
        video_clip = concatenate_videoclips([video_clip for i in range(times)])
        video_clip = video_clip.subclip(0, audio_duration)
    final_clip = video_clip.set_audio(audio_clip)
    final_clip.write_videofile(output_path)
    name, url = upload_video(output_path)
    return name, url

if __name__ == '__main__':
    download_image('hlvHTmA5r9RHH2U1.jpg')
    download_image('oCQeuzqjaCISMetD.jpg')
    name1, url1 = upload_image("StyleTransfer/images/content/venice-boat.jpg")
    name2, url2 = upload_image("StyleTransfer/images/21styles/candy.jpg")
    print(url1)
    print(url2)
    name, url = edit_video("Trump","./TrumpSpeak/output/I love this school.wav", "./TrumpSpeak/output/final.mp4")








