import requests
import json

def createAudio(person, text, outpath):
    url = "https://api.uberduck.ai/speak"
    data_raw = '{"speech":' + '"' + text + '",' + '"voice":' + '"' + person + '"}'
    print(data_raw)
    response = requests.post("https://api.uberduck.ai/speak", auth=("pub_knssqpvuqdknnvakjs", "pk_922f3532-3b17-4c33-93da-15e1869ade10"), data=data_raw)
    uuid = json.loads(response.content.decode('utf8'))["uuid"]
    url = "https://api.uberduck.ai/speak-status?uuid="+uuid
    audio_url = ""
    i = 0
    while (audio_url=="" or audio_url is None and i<500):
        response = requests.get(url, auth=("pub_knssqpvuqdknnvakjs", "pk_922f3532-3b17-4c33-93da-15e1869ade10"))
        audio_url = json.loads(response.content.decode('utf8'))['path']
        i += 1
    response = requests.get(audio_url, stream=True)
    with open(outpath, "wb") as handle:
        for data in response.iter_content():
            handle.write(data)

if __name__ == '__main__':
    createAudio("donald-duck","Nobody knows oose better than me","audio.wav")
