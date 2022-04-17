import sys
sys.path.append('../slippi')
import slippi
import json
import uuid
import os
import convertCodec
import subprocess
import glob

# MAKE_COSTUMES_NEUTRAL = False
# THE_SEARCH_BUFFER = 50


FPS = 15 # i have no idea?
frameTime = []
PATH = os.getcwd()

fileUrl = "./slp2mp4/highlights.json";


def clean(dir):
	for file in glob.glob(f"{dir}/*"):
		print(file)
	    # os.remove(file)
clean(f"{PATH}/out")

if __name__ == "__main__":
	#split highlights into separate files
	count = 0
	with open(fileUrl, "r") as f:
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
				frameTime.append(FPS * (highlight['endFrame'] - highlight['startFrame']))
				count += 1

	# # run slp2mp4 on each highlight
	# for i in range(count):
	# 	# 									 					this doesn't matter
	# 	# 														but needs to point to valid
	# 	# 														slp file to trick slp2mp4
	# 	p1 = subprocess.Popen(f"py {PATH}/slp2mp4/slp-to-mp4.py {PATH}/tests/test.slp {PATH}/out/clip{i}.mp4 {PATH}/jsons/highlight-{i}.json")
	# 	code = p1.wait()
	# 	#convert each file to h264
	# 	convertCodec.convert(f"{PATH}/out/clip{i}.mp4", f"{PATH}/out/clip{i}converted.mp4")

	# #clean dir
	# for i in range(count):
	# 	# remove all normal clips and rename converted to clip
	# 	os.remove(f"{PATH}/out/clip{i}.mp4")
	# 	os.rename(f"{PATH}/out/clip{i}converted.mp4", f"{PATH}/out/clip{i}.mp4")

	# create clips json object
	clips = []
	for i, highlight in enumerate(data['queue']):
		clips.append({
			"clipSrc": f"clip{i}",
			"player": "",
			"character": highlight['character']
		})

	with open(f"../server/clips.json", "w") as file:
		json.dump(clips, file, indent=2)
