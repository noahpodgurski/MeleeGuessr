import os

FFMPEG = "C:/Users/Noah/Documents/Programming/ffmpeg/bin/ffmpeg.exe"

def convert(inFile, outFile):
	command = f"{FFMPEG} -y -i {inFile} -vcodec h264 {outFile}"
	os.system(command)



if __name__ == "__main__":
	testIn = "C:/Users/Noah/Documents/Programming/Websites/MeleeGuessr/Scripts/out/clip0.mp4"
	testOut = "C:/Users/Noah/Documents/Programming/Websites/MeleeGuessr/Scripts/out/clip0converted.mp4"
	convert(testIn, testOut)