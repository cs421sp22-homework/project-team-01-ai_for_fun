import logging
import json
import numpy as np
import os
from http.server import BaseHTTPRequestHandler, HTTPServer
from util import upload_image, generate_random_name, url_to_image
from run_cifar import eval_cifar
from FaceSwap.output import faceSwapFunction
from  connect2db import  savefileinfo, getuploadrecord

def Aichange(url):
    result=eval_cifar(url)
    return result
def styleflow(url):
    result = "https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png"
    return result
def exchangeaudio(url):
    result = "https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png"
    return result
def AiFaceSwap(src_url, dst_url):
    src_img = url_to_image(src_url)
    dst_img = url_to_image(dst_url)
    out_dir = generate_random_name(16)
    out_dir = faceSwapFunction(src_img, dst_img, out_dir)
    outName, outUrl = upload_image(out_dir)
    os.remove(out_dir)
    print(outName, outUrl)
    return  outName, outUrl


class S(BaseHTTPRequestHandler):
    def _set_response(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        logging.info("GET request,\nPath: %s\nHeaders:\n%s\n", str(self.path), str(self.headers))
        router=str(self.path)
        route=router.split("/",2)
        if route[1]=="history":
            res=getuploadrecord(route[2])
        print(res)
        output=json.dumps(res)
        self._set_response()
        self.wfile.write("{}".format(output).encode('utf-8'))

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
            user_id=data["user_id"]
            print(user_id)
            src_url = data["src_url"]
            dst_url = data["dst_url"] 
            res_name, res_url = AiFaceSwap(src_url, dst_url)
            res = {"res_name": res_name, "res_url":res_url}
            savefileinfo(data)
        if (str(self.path)=="/styleflow"):
            print("running styleflow service")
            url = data["url"]
            res=styleflow(url)
        if (str(self.path)=="/exchangeaudio"):
            print("running exchangeaudio service")
            url = data["url"]
            res=exchangeaudio(url)
        output = json.dumps(res)
        self._set_response()
        self.wfile.write("{}".format(output).encode('utf-8'))


def run(server_class=HTTPServer, handler_class=S, port=8080):
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