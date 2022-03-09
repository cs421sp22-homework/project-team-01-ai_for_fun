import boto3

s3 = boto3.client('s3')
# s3.upload_file('./test/cat/0005.jpg','aifun','test_cat_0005.jpg')
url = s3.generate_presigned_url('get_object',
                                Params={
                                    'Bucket': 'aifun',
                                    'Key': '0000.jpg',
                                },                                  
                                ExpiresIn=7200)
print(url)