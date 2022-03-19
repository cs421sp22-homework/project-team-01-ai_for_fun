from unicodedata import name
import boto3
import cv2
import numpy as np
import string
import random
from datetime import datetime
from urllib.request import urlopen

ACCESS_ID = 'AKIAXRGYYT5KAP6UULMP'
ACCESS_KEY = 'hg8tUJkMiNVi+KO9qUr7vTL0ZUY5tIzfGSzHJqbr'

def generate_random_name(len):
    random.seed(datetime.now())
    res = ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase +
                             string.digits, k = len))
    res = res + '.jpg'
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

if __name__ == '__main__':
    download_image('hlvHTmA5r9RHH2U1.jpg')
    download_image('oCQeuzqjaCISMetD.jpg')





