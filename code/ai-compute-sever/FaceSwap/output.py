#! /usr/bin/env python
import os
from pip import main
import cv2
import argparse
from FaceSwap.face_detection import select_face, select_all_faces
from FaceSwap.face_swap import face_swap


def faceSwapFunction(src_img, dst_img, out):

    # Select src face
    src_points, src_shape, src_face = select_face(src_img)
    # Select dst face
    dst_faceBoxes = select_all_faces(dst_img)

    #set facesawap arg
    parser = argparse.ArgumentParser(description='FaceSwapApp')
    parser.add_argument('--warp_2d', default=False, action='store_true', help='2d or 3d warp')
    parser.add_argument('--correct_color', default=True, action='store_true', help='Correct color')
    args = parser.parse_args()

    if dst_faceBoxes is None:
        print('Detect 0 Face !!!')
        exit(-1)

    output = dst_img
    for k, dst_face in dst_faceBoxes.items():
        output = face_swap(src_face, dst_face["face"], src_points,
                           dst_face["points"], dst_face["shape"],
                           output, args)

    # dir_path = os.path.dirname(out)
    # if not os.path.isdir(dir_path):
    #     os.makedirs(dir_path)

    cv2.imwrite(out, output)
    return(out)

if __name__ == '__main__':
    faceSwapFunction("./imgs/test1.jpg","./imgs/test4.jpg","./results/myoutput1.jpg")


    
