from http.server import BaseHTTPRequestHandler, HTTPServer
import logging
import json
from run_cifar import eval_cifar

def Aichange(url):
    result=eval_cifar(url)
    return result
def faceswap(url):
    result="https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png"
    return result
def styleflow(url):
    result = "https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png"
    return result
def exchangeaudio(url):
    result = "https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png"
    return result
class S(BaseHTTPRequestHandler):
    def _set_response(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    def do_GET(self):
        logging.info("GET request,\nPath: %s\nHeaders:\n%s\n", str(self.path), str(self.headers))
        self._set_response()
        self.wfile.write("GET request for {}".format(self.path).encode('utf-8'))

    def do_POST(self):
        content_length = int(self.headers['Content-Length']) # <--- Gets the size of data
        post_data = self.rfile.read(content_length) # <--- Gets the data itself
        # print(post_data)
        logging.info("POST request,\nPath: %s\nHeaders:\n%s\n\nBody:\n%s\n",
                str(self.path), str(self.headers), post_data.decode('utf-8'))
        data = json.loads(post_data.decode('utf-8'))
        url = data["url"]
        if (str(self.path)=="/test"):
            print("running cifar service")
            res=Aichange(url)
        if (str(self.path)=="/faceswap"):
            print("running faceswap service")
            res=faceswap(url)
        if (str(self.path)=="/styleflow"):
            print("running styleflow service")
            res=styleflow(url)
        if (str(self.path)=="/exchangeaudio"):
            print("running exchangeaudio service")
            res=exchangeaudio(url)


        self._set_response()
        self.wfile.write("{}".format(res).encode('utf-8'))


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