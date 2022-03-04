from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive

gauth = GoogleAuth()           
drive = GoogleDrive(gauth) 

folder_id = "1i_pvxmUNu--9gVspZhrCkSguV8a7QhEV"
upload_file = "./test/cat/0002.jpg"
gfile = drive.CreateFile({'parents': [{'id': folder_id}]})
gfile.SetContentFile(upload_file)
gfile.Upload()
permission = gfile.InsertPermission({
                        'type': 'anyone',
                        'value': 'anyone',
                        'role': 'reader'})
print(gfile['id'])
