from unicodedata import name
import boto3
import cv2
import numpy as np
import string
import random
from datetime import datetime
from urllib.request import urlopen

def generate_random_name(len):
    random.seed(datetime.now())
    res = ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase +
                             string.digits, k = len))
    res = res + '.jpg'
    return res

def upload_image(img_dir):
    s3 = boto3.client('s3')
    name = generate_random_name(16)
    s3.upload_file(img_dir,'aifun', name)
    url = s3.generate_presigned_url('get_object',
                                Params={
                                    'Bucket': 'aifun',
                                    'Key': name,
                                },                                  
                                ExpiresIn=7200)
    return name, url

def url_to_image(url, readFlag=cv2.IMREAD_COLOR):
    resp = urlopen(url)
    image = np.asarray(bytearray(resp.read()), dtype="uint8")
    image = cv2.imdecode(image, readFlag)
    return image



