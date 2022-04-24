from email.mime import audio
import logging
import json
import numpy as np
import os
import cv2
from http.server import BaseHTTPRequestHandler, HTTPServer
from util import upload_image, generate_random_name, url_to_image,edit_video, createAudio
from run_cifar import eval_cifar
from FaceSwap.output import faceSwapFunction
from  connect2db import  savefileinfo, getuploadrecord, saveuploadfile, saveworkfile
from StyleTransfer.style_transfer import style_transfer_api

def Aichange(url):
    result=eval_cifar(url)
    return result
def style_transfer(content_image_url, style_image_url):
     content_image_path = generate_random_name(16)
     style_image_path = generate_random_name(16)
     content_image = url_to_image(content_image_url)
     style_image = url_to_image(style_image_url)
     cv2.imwrite(content_image_path, content_image)
     cv2.imwrite(style_image_path, style_image)
     output_image_path = generate_random_name(16)
     style_transfer_api(content_image_path, style_image_path, output_image_path)
     outName, outUrl = upload_image(output_image_path)
     os.remove(output_image_path)
     os.remove(content_image_path)
     os.remove(style_image_path)
     return outName, outUrl

def exchangeaudio(text,person):
    outName, outUrl = "", ""
    audio_path = "./Text_to_audio/audio/" + person + "_" + text + ".wav"
    video_path = "./Text_to_audio/video/" + person + ".mp4"
    output_path = "./Text_to_audio/output/"+ person + "_" + text +".mp4"
    createAudio(person, text, audio_path)
    outName,outUrl = edit_video(audio_path, video_path, output_path)
    os.remove(audio_path)
    os.remove(output_path)
    return outName, outUrl
    

    return outName,outUrl
def AiFaceSwap(src_url, dst_url):
    src_img = url_to_image(src_url)
    dst_img = url_to_image(dst_url)
    out_dir = generate_random_name(16)
    out_dir = faceSwapFunction(src_img, dst_img, out_dir)
    outName, outUrl = upload_image(out_dir)
    os.remove(out_dir)
    return  outName, outUrl


class S(BaseHTTPRequestHandler):
    def _set_response(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "*")
        self.send_header("Access-Control-Allow-Headers", "Authorization, Content-Type")
        self.end_headers()
    def do_GET(self):
        logging.info("GET request,\nPath: %s\nHeaders:\n%s\n", str(self.path), str(self.headers))
        router=str(self.path)
        route=router.split("/",2)
        res = ""
        if route[1]=="history":
            res=getuploadrecord(route[2])
        output=json.dumps(res)
        self._set_response()
        self.wfile.write("{}".format(output).encode('utf-8'))

    def do_OPTIONS(self):
        self._set_response()

    def do_POST(self):
        content_length = int(self.headers['Content-Length']) # <--- Gets the size of data
        post_data = self.rfile.read(content_length) # <--- Gets the data itself
        # print(post_data)
        logging.info("POST request,\nPath: %s\nHeaders:\n%s\n\nBody:\n%s\n",
                str(self.path), str(self.headers), post_data.decode('utf-8'))
        data = json.loads(post_data.decode('utf-8'))
        if (str(self.path)=="/test"):
            print("running cifar service")
            url = data["url"]
            res=Aichange(url)
        if (str(self.path)=="/faceswap"):
            print("running faceswap service")
            user_id = data["user_id"]
            src_url = data["src_url"]
            dst_url = data["dst_url"]
            if(data["src_s3_id"]==""):
                src_s3_id = ""
            else:
                src_s3_id="public/"+data["src_s3_id"]
            if(data["dst_s3_id"]==""):
                dst_s3_id=""
            else:
                dst_s3_id="public/"+data["dst_s3_id"]
            history_type = data["type"]
            res_name, res_url = AiFaceSwap(src_url, dst_url)
            res = {"res_s3_id": res_name, "res_url": res_url}
            historydata = {}
            workdata = {}
            workdata["user_id"] = user_id
            workdata["s3_id"] = res_name
            workdata["type"] = "image"
            workdata["url"] = res_url
            saveworkfile(workdata)
            if (src_s3_id != "" or dst_s3_id != ""):
                historydata["user_id"] = user_id
                historydata["src_s3_id"] = src_s3_id
                historydata["dst_s3_id"] = dst_s3_id
                historydata["type"] = history_type
                saveuploadfile(historydata)
            
            

        if (str(self.path)=="/styletransfer"):
            print("running styleflow service")
            user_id=data["user_id"]
            content_url = data["content_url"]
            style_url = data["style_url"]
            if(data["src_s3_id"]==""):
                src_s3_id = ""
            else:
                src_s3_id="public/"+data["src_s3_id"] # src <-> content
            if(data["dst_s3_id"]==""):
                dst_s3_id=""
            else:
                dst_s3_id="public/"+data["dst_s3_id"] # dst <-> style
            history_type = data["type"]

            res_name, res_url = style_transfer(content_url, style_url)
            res = {"res_s3_id": res_name, "res_url":res_url}
            historydata = {}
            workdata = {}
            workdata["user_id"] = user_id
            workdata["s3_id"] = res_name
            workdata["type"] = "image"
            workdata["url"] = res_url
            saveworkfile(workdata)
            if (src_s3_id != "" or dst_s3_id != ""):
                historydata["user_id"] = user_id
                historydata["src_s3_id"] = src_s3_id
                historydata["dst_s3_id"] = dst_s3_id
                historydata["type"] = history_type
                saveuploadfile(historydata)


        if (str(self.path)=="/exchangeaudio"):
            print("running exchangeaudio service")
            user_id = data["user_id"]
            text = data["text"]
            person = data["person"]
            res_name, res_url=exchangeaudio(text, person)
            res = {"res_s3_id": res_name, "res_url": res_url}
            workdata = {}
            workdata["user_id"] = user_id
            workdata["s3_id"] = res_name
            workdata["type"] = "video"
            workdata["url"] = res_url
            saveworkfile(workdata)
        output = json.dumps(res)
        self._set_response()
        self.wfile.write("{}".format(output).encode('utf-8'))


def run(server_class=HTTPServer, handler_class=S, port=80):
    logging.basicConfig(level=logging.INFO)
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    logging.info('Starting httpd...\n')
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
    logging.info('Stopping httpd...\n')

if __name__ == '__main__':
    from sys import argv

    if len(argv) == 2:
        run(port=int(argv[1]))
    else:
        run()