"""
For converting .slp files to HTML5 compatible clips of highlights - with character (&player) data attached
1. Run combo parser (clippi for now) -> export as highlights.json
2.
    2a. Add characters (and players) to highlights.json
    2b. Split highlights into separate json files
3.
    3a. Run slp2mp4 on each highlight.json (exports many clip[i].mp4) Also run each with MeleeNeut.iso for exporting as neutclip[i].mp4
    3b. Transcode each clip to h264 codec (necessary for using with HTML5)
    3c. Clean dir (overwrite normal clips with transcoded clips)
4. Create clips json object - attaches character (&player) data
"""

import sys
# sys.path.append('../slippi')
import slippi
import json
import uuid
import os
import convertCodec
import subprocess
import glob
import addCharacterToJson
from art import *



# MAKE_COSTUMES_NEUTRAL = False
# THE_SEARCH_BUFFER = 50


FPS = 15 # i have no idea?
PATH = os.getcwd()
# CODES = {
#     "Mang0": ["MANG#0", "mang0"],
#     "Medz": ["MEDZ#841", ]
# }

OUT_PATH = r"E:/MeleeGuessrSlp/OUT/"
SLP_PATH = r"E:/MeleeGuessrSlp/Tournament/test" #this doesn't matter - should probably remove from slp2mp4
# HIGHLIGHTS_PATH = "E:/MeleeGuessrSlp/Tournament/test.json"
HIGHLIGHTS_PATH = "E:/MeleeGuessrSlp/Player/Mang0/highlights.json"

CLIP_OFFSET = 0 #starting clip index
CLIP_STOP = 0 #stopping clip index leave 0 for normal behavior

def clean(dir):
    for file in glob.glob(f"{dir}/*"):
        os.remove(file)

def splitHighlights():
    if not CLIP_OFFSET or not CLIP_STOP:
        clean(f"{PATH}/jsons/")

    count = 0
    with open(HIGHLIGHTS_PATH, "r") as f:
        data = json.load(f)
        for i, highlight in enumerate(data['queue']):
            print(highlight['path'])
            jobId = str(uuid.uuid4())
            commData = {
                'mode': 'normal',
                'isRealTimeMode': False,
                'commandId': jobId,
                'replay': highlight['path'],
                'gameStartAt': highlight.get('gameStartAt'),
                'gameStation': highlight.get('gameStation'),
                'startFrame': highlight['startFrame'],
                'endFrame': highlight['endFrame'],
                'character': highlight.get('character'),
                'player': highlight.get('player')
            }

            with open(f"{PATH}/jsons/highlight-{i}.json", "w") as commFile:
                json.dump(commData, commFile, indent=2)
                count += 1
    return data, count


if __name__ == "__main__":
    # backup = input("Did you backup server/clips.json?")
    # if backup != 'y':
    #     quit()

    clean(f"{OUT_PATH}")
    # #1. run combo parser (clippi for now)

    # #2a. add character to .json
    addCharacterToJson.addCharacterToJson(HIGHLIGHTS_PATH)

    # #2b. split highlights into separate files
    data, count = splitHighlights() 

    #3a. run slp2mp4 on each highlight
    for i in range(count-CLIP_OFFSET):
        if i+CLIP_OFFSET >= CLIP_STOP:
            break
        tprint(f"clip {i+CLIP_OFFSET} / {count}")
        #                                                                                                           this doesn't matter
        #                                                                                                       but needs to point to valid
        #                                                                                                       slp file to trick slp2mp4
        p1 = subprocess.Popen(f"py {PATH}/slp2mp4/slp-to-mp4.py {SLP_PATH}/test.slp {OUT_PATH}/clip{i+CLIP_OFFSET}.mp4 {PATH}/jsons/highlight-{i+CLIP_OFFSET}.json")
        code = p1.wait()

        #3b. convert each file to h264
        command1 = convertCodec.getCommand(f"{OUT_PATH}/clip{i+CLIP_OFFSET}.mp4", f"{OUT_PATH}/clip{i+CLIP_OFFSET}converted.mp4")
        command2 = convertCodec.getCommand(f"{OUT_PATH}/neutclip{i+CLIP_OFFSET}.mp4", f"{OUT_PATH}/neutclip{i+CLIP_OFFSET}converted.mp4")
        p1 = subprocess.Popen(command1)
        p2 = subprocess.Popen(command2)
        p1.wait()
        p2.wait()

        #3c. prune dir
        try:
            # remove all normal clips and rename converted to clip
            if os.path.exists(f"{OUT_PATH}/clip{i+CLIP_OFFSET}.mp4") and os.path.exists(f"{OUT_PATH}/clip{i+CLIP_OFFSET}converted.mp4") and os.path.exists(f"{OUT_PATH}/neutclip{i+CLIP_OFFSET}.mp4") and os.path.exists(f"{OUT_PATH}/neutclip{i+CLIP_OFFSET}converted.mp4"):
                os.remove(f"{OUT_PATH}/clip{i+CLIP_OFFSET}.mp4")
                os.rename(f"{OUT_PATH}/clip{i+CLIP_OFFSET}converted.mp4", f"{OUT_PATH}/clip{i+CLIP_OFFSET}.mp4")
                os.remove(f"{OUT_PATH}/neutclip{i+CLIP_OFFSET}.mp4")
                os.rename(f"{OUT_PATH}/neutclip{i+CLIP_OFFSET}converted.mp4", f"{OUT_PATH}/neutclip{i+CLIP_OFFSET}.mp4")
            # only keep each if we have both clip and neutclip
            elif os.path.exists(f"{OUT_PATH}/clip{i+CLIP_OFFSET}.mp4") and not os.path.exists(f"{OUT_PATH}/neutclip{i+CLIP_OFFSET}.mp4"):
                os.remove(f"{OUT_PATH}/clip{i+CLIP_OFFSET}.mp4")
            elif not os.path.exists(f"{OUT_PATH}/clip{i+CLIP_OFFSET}.mp4") and os.path.exists(f"{OUT_PATH}/neutclip{i+CLIP_OFFSET}.mp4"):
                os.remove(f"{OUT_PATH}/neutclip{i+CLIP_OFFSET}.mp4")
        except:
            print(f"Could not clean clip{i+CLIP_OFFSET}.. it probably didn't get created")

    # 4. create clips json object
    print("creating clips.json...")
    clips = []
    for i, highlight in enumerate(data['queue']):
        print(os.path.exists(f"{OUT_PATH}/clip{i}.mp4"))
        if os.path.exists(f"{OUT_PATH}/clip{i}.mp4") and os.path.exists(f"{OUT_PATH}/neutclip{i}.mp4"):
            clips.append({
                "clipSrc": f"clip{i}",
                "neutclipSrc": f"neutclip{i}",
                "player": "",
                "character": highlight['character'],
                "slp": highlight['path'],
                'gameStation': highlight['gameStation'],
            })

    #get past player data
    with open(f"../server/clips.json", "r") as f:
        oldClips = json.load(f)

    #populate with past player data
    for i, clip in enumerate(oldClips):
        if clip.get('player'):
            if clip['slp'] == clips[i]['slp']:
                clips[i]['player'] = clip['player']

    #update player data
    with open(f"../server/clips.json", "w") as file:
        json.dump(clips, file, indent=2)
