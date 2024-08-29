import os
from subprocess import PIPE, run

FFMPEG = "C:/Users/Noah/Documents/Programming/ffmpeg/bin/ffmpeg.exe"
FFPROBE = "C:/Users/Noah/Documents/Programming/ffmpeg/bin/ffprobe.exe"

def getCommand(inFile, outFile):
	return f"{FFMPEG} -y -i {inFile} -vcodec h264 {outFile}"
	# os.system(command)


def ish264(file):
	command = f"{FFPROBE} -v error -select_streams v:0 -show_entries stream=codec_name -of default=noprint_wrappers=1:nokey=1 {file}"
	result = run(command, stdout=PIPE, stderr=PIPE, universal_newlines=True)
	# print(result.returncode, result.stdout, result.stderr)
	return result.stdout.strip("\n") == "h264"


# if __name__ == "__main__":
	# testIn = "C:/Users/Noah/Documents/Programming/Websites/MeleeGuessr/Scripts/out/clip0.mp4"
	# testOut = "C:/Users/Noah/Documents/Programming/Websites/MeleeGuessr/Scripts/out/clip0converted.mp4"
	# convert(testIn, testOut)

	# test = "E:/MeleeGuessrSlp/OUT/clip20.mp4"
	# print(f"{ish264(test)}") #mpeg4 / h264