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

import json
import threading
import uuid
import os
import glob
import logging

import addCharacterToJson
import createClipsJson
import convertSlpToClip




# MAKE_COSTUMES_NEUTRAL = False
# THE_SEARCH_BUFFER = 50


FPS = 15 # i have no idea?
PATH = os.getcwd()
# CODES = {
#     "Mang0": ["MANG#0", "mang0"],
#     "Medz": ["MEDZ#841", ]
# }

OUT_PATH = r"E:/MeleeGuessrSlp/OUT/"
SLP_PATH = r"E:/MeleeGuessrSlp/Tournament/Parsed/test" #this doesn't matter - should probably remove from slp2mp4
# HIGHLIGHTS_PATH = "E:/MeleeGuessrSlp/Tournament/test.json"
# HIGHLIGHTS_PATH = "E:/MeleeGuessrSlp/Player/Mang0/highlights.json"
HIGHLIGHTS_PATH = "E:/MeleeGuessrSlp/Tournament/Unparsed/highlights.json"

CLIP_OFFSET = 10038 #starting clip index
CLIP_STOP = 0 #stopping clip index leave 0 for normal behavior

def clean(dir):
    for file in glob.glob(f"{dir}/*"):
        os.remove(file)

def splitHighlights():
    # if not CLIP_OFFSET or not CLIP_STOP:
    #     clean(f"{PATH}/jsons/")

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

            with open(f"{PATH}/jsons/highlight-{i+CLIP_OFFSET}.json", "w") as commFile:
                json.dump(commData, commFile, indent=2)
                count += 1
    return data, count


if __name__ == "__main__":
    a1 = input(f"Did you update the CLIP_OFFSET var? (Check the highest num on S3 and update accordingly) Currently {CLIP_OFFSET}")
    if a1 != "y":
        print("Go do that first fool!")
        return

    # #1. run combo parser (clippi for now)


    # backup = input("Did you backup server/clips.json?")
    # if backup != 'y':
    #     quit()

    x1 = input(f"Do you want to clear {OUT_PATH}? ")
    if x1 == "y":
        clean(f"{OUT_PATH}")


    # #2a. add character to .json
    x2 = input(f"Do you want to add character/player data to highlights.json? ")
    if x2 == "y":
        addCharacterToJson.addCharacterToJson(HIGHLIGHTS_PATH)

    # #2b. split highlights into separate files
    data, count = splitHighlights() 

    #3a. convert each .slp to clip
    x3 = input(f"Do you want to run the slp/clip converter? (This takes a whileee) ")
    if x3 == "y":
        numThreads = 4

        def thread_func(thread_num):
            for i in range(thread_num, count, numThreads):
                convertSlpToClip.convertSlpToClip(i+CLIP_OFFSET, count)


        threads = list()
        for index in range(numThreads):
            logging.info("Main    : create and start thread %d.", index)
            x = threading.Thread(target=thread_func, args=(index,))
            threads.append(x)
            x.start()

        for index, thread in enumerate(threads):
            logging.info("Main    : before joining thread %d.", index)
            thread.join()
            logging.info("Main    : thread %d done", index)


    # RERENDER ALL MISSING FILES


    # 4. create clips json object
    createClipsJson.createClipsJson(data, count, CLIP_OFFSET)
    
