import StyleTransfer.utils as utils
import torch
from StyleTransfer.net import Net
from torch.autograd import Variable

def style_transfer_api(content_image, style_image, output_image):
    content_image = utils.tensor_load_rgbimage(content_image, size=1024, keep_asp=True)
    content_image = content_image.unsqueeze(0)
    style = utils.tensor_load_rgbimage(style_image, size=1024)
    style = style.unsqueeze(0)    
    style = utils.preprocess_batch(style)

    style_model = Net(ngf=128)
    model_dict = torch.load("StyleTransfer/models/21styles.model")
    model_dict_clone = model_dict.copy()
    for key, value in model_dict_clone.items():
        if key.endswith(('running_mean', 'running_var')):
            del model_dict[key]
    style_model.load_state_dict(model_dict, False)

    if torch.cuda.is_available():
        style_model.cuda()
        content_image = content_image.cuda()
        style = style.cuda()

    style_v = Variable(style)

    content_image = Variable(utils.preprocess_batch(content_image))
    style_model.setTarget(style_v)

    output = style_model(content_image)
    utils.tensor_save_bgrimage(output.data[0], output_image, torch.cuda.is_available())

if __name__ == "__main__":
    style_transfer_api("StyleTransfer/images/content/venice-boat.jpg","StyleTransfer/images/21styles/candy.jpg","StyleTransfer/images/output/test1.jpg")