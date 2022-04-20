"""
For converting .slp files to HTML5 compatible clips of highlights - with character (&player) data attached
1. Run combo parser (clippi for now) -> export as highlights.json
2. Split highlights into separate json files
3a. Run slp2mp4 on each highlight.json (exports many clip[i].mp4)
3b. Also run each with MeleeNeut.iso for exporting as neutral[i].mp4
4. Transcode each clip to h264 codec (necessary for using with HTML5)
5. Clean dir (overwrite normal clips with transcoded clips)
6. Create clips json object - attaches character (&player) data
"""

# stop

# Traceback (most recent call last):
#   File "C:\Users\Noah\Documents\Programming\Websites\MeleeGuessr\Scripts\slp2mp4\slp-to-mp4.py", line 252, in <module>
#     main()
#   File "C:\Users\Noah\Documents\Programming\Websites\MeleeGuessr\Scripts\slp2mp4\slp-to-mp4.py", line 248, in main
#     record_file_slp(slp_file, outfile, outfileNeut, OVERWRITE_COMMS)
#   File "C:\Users\Noah\Documents\Programming\Websites\MeleeGuessr\Scripts\slp2mp4\slp-to-mp4.py", line 102, in record_file_slp
#     ffmpeg_runner.run(video_file, audio_file, outfileName)
# UnboundLocalError: local variable 'outfileName' referenced before assignment

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



# MAKE_COSTUMES_NEUTRAL = False
# THE_SEARCH_BUFFER = 50


FPS = 15 # i have no idea?
PATH = os.getcwd()

SLP_PATH = r"E:/MeleeGuessrSlp/Tournament/test"
# HIGHLIGHTS_PATH = "E:/MeleeGuessrSlp/Tournament/test.json"
HIGHLIGHTS_PATH = "E:/MeleeGuessrSlp/Tournament/highlights.json"

def clean(dir):
	for file in glob.glob(f"{dir}/*"):
	    os.remove(file)

def splitHighlights():
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
				'gameStartAt': highlight['gameStartAt'],
				'gameStation': highlight['gameStation'],
				'startFrame': highlight['startFrame'],
				'endFrame': highlight['endFrame'],
				'character': highlight['character']
			}

			with open(f"{PATH}/jsons/highlight-{i}.json", "w") as commFile:
				json.dump(commData, commFile, indent=2)
				count += 1
	return data, count


if __name__ == "__main__":
	backup = input("Did you backup server/clips.json?")
	if backup != 'y':
		quit()

	# clean(f"{PATH}/out")
	# #1. run combo parser (clippi for now)

	# #1b. add character to .json
	addCharacterToJson.addCharacterToJson(HIGHLIGHTS_PATH)

	# #2. split highlights into separate files
	data, count = splitHighlights()	

	#3a. run slp2mp4 on each highlight
	for i in range(count):
		# 									 																		this doesn't matter
		#												 														but needs to point to valid
		# 																										slp file to trick slp2mp4
		p1 = subprocess.Popen(f"py {PATH}/slp2mp4/slp-to-mp4.py {SLP_PATH}/test.slp {PATH}/out/clip{i}.mp4 {PATH}/jsons/highlight-{i}.json")
		code = p1.wait()

		#4. convert each file to h264
		convertCodec.convert(f"{PATH}/out/clip{i}.mp4", f"{PATH}/out/clip{i}converted.mp4")
		convertCodec.convert(f"{PATH}/out/neutclip{i}.mp4", f"{PATH}/out/neutclip{i}converted.mp4")

	#clean dir
	for i in range(count):
		try:
			# remove all normal clips and rename converted to clip
			if os.path.exists(f"{PATH}/out/clip{i}.mp4") and os.path.exists(f"{PATH}/out/clip{i}converted.mp4") and os.path.exists(f"{PATH}/out/neutclip{i}.mp4") and os.path.exists(f"{PATH}/out/neutclip{i}converted.mp4"):
				os.remove(f"{PATH}/out/clip{i}.mp4")
				os.rename(f"{PATH}/out/clip{i}converted.mp4", f"{PATH}/out/clip{i}.mp4")
				os.remove(f"{PATH}/out/neutclip{i}.mp4")
				os.rename(f"{PATH}/out/neutclip{i}converted.mp4", f"{PATH}/out/neutclip{i}.mp4")
			elif os.path.exists(f"{PATH}/out/clip{i}.mp4") and not os.path.exists(f"{PATH}/out/neutclip{i}.mp4"):
				os.remove(f"{PATH}/out/clip{i}.mp4")
			elif not os.path.exists(f"{PATH}/out/clip{i}.mp4") and os.path.exists(f"{PATH}/out/neutclip{i}.mp4"):
				os.remove(f"{PATH}/out/neutclip{i}.mp4")

		except:
			print(f"Could not clean clip{i}.. it probably didn't get created")

	# create clips json object
	print("creating clips.json...")
	clips = []
	for i, highlight in enumerate(data['queue']):
		print(os.path.exists(f"{PATH}/out/clip{i}.mp4"))
		if os.path.exists(f"{PATH}/out/clip{i}.mp4") and os.path.exists(f"{PATH}/out/neutclip{i}.mp4"):
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
