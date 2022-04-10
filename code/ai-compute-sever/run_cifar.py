import io
import numpy as np
from PIL import Image
import torch
from cifarmodel import Net
import requests

def load_cifarmodel(model_dir):
    model = Net()
    model.load_state_dict(torch.load(model_dir))
    return(model)

def eval_cifar(image_url):
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    dir = "./cifar_net.pth"

    model = load_cifarmodel(model_dir=dir)
    model.to(device)
    model.eval()

    img_request = requests.get(image_url, stream=True)
    img = Image.open(io.BytesIO(img_request.content))
    arr = np.asarray(img)
    arr = np.transpose(arr, (2,0,1))
    arr = np.expand_dims(arr,axis=0)
    arr = arr.astype(np.float32)
    input = torch.tensor(arr)
    print(input.shape)

    with torch.no_grad():
        output = model(input)
        _, prediction = torch.max(output,1)
        return prediction[0]

