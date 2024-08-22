import os
import subprocess
from art import *
import convertCodec

from splitMang0Highlights import FPS, PATH, SLP_PATH, OUT_PATH, CLIP_OFFSET

def convertSlpToClip(i, count):
    tprint(f"clip {i-CLIP_OFFSET} / {count}")
    #                                                                                                           this doesn't matter
    #                                                                                                       but needs to point to valid
    #                                                                                                       slp file to trick slp2mp4
    p1 = subprocess.Popen(f"py {PATH}/slp2mp4/slp-to-mp4.py {SLP_PATH}/test.slp {OUT_PATH}/clip{i}.mp4 {PATH}/jsons/highlight-{i}.json")
    code = p1.wait()

    #3b. convert each file to h264
    command1 = convertCodec.getCommand(f"{OUT_PATH}/clip{i}.mp4", f"{OUT_PATH}/clip{i}converted.mp4")
    command2 = convertCodec.getCommand(f"{OUT_PATH}/neutclip{i}.mp4", f"{OUT_PATH}/neutclip{i}converted.mp4")
    p1 = subprocess.Popen(command1)
    p2 = subprocess.Popen(command2)
    p1.wait()
    p2.wait()

    #3c. prune dir
    try:
        # remove all normal clips and rename converted to clip
        if os.path.exists(f"{OUT_PATH}/clip{i}.mp4") and os.path.exists(f"{OUT_PATH}/clip{i}converted.mp4") and os.path.exists(f"{OUT_PATH}/neutclip{i}.mp4") and os.path.exists(f"{OUT_PATH}/neutclip{i}converted.mp4"):
            os.remove(f"{OUT_PATH}/clip{i}.mp4")
            os.rename(f"{OUT_PATH}/clip{i}converted.mp4", f"{OUT_PATH}/clip{i}.mp4")
            os.remove(f"{OUT_PATH}/neutclip{i}.mp4")
            os.rename(f"{OUT_PATH}/neutclip{i}converted.mp4", f"{OUT_PATH}/neutclip{i}.mp4")
        # only keep each if we have both clip and neutclip
        elif os.path.exists(f"{OUT_PATH}/clip{i}.mp4") and not os.path.exists(f"{OUT_PATH}/neutclip{i}.mp4"):
            os.remove(f"{OUT_PATH}/clip{i}.mp4")
        elif not os.path.exists(f"{OUT_PATH}/clip{i}.mp4") and os.path.exists(f"{OUT_PATH}/neutclip{i}.mp4"):
            os.remove(f"{OUT_PATH}/neutclip{i}.mp4")
    except:
        print(f"Could not clean clip{i}.. it probably didn't get created")