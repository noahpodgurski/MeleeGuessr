import convertSlptToClip

from splitMang0Highlights import OUT_PATH
import convertCodec

def createClipsJson(data, count):
    print("creating clips.json...")
    clips = []
    for i, highlight in enumerate(data['queue']):
        
        missingFiles = []
        if not os.path.exists(f"{OUT_PATH}/clip{i}.mp4" or not os.path.exists(f"{OUT_PATH}/neutclip{i}.mp4"):
            print(f"neut(?)clip{i} is missing, rerendering...")
            missingFiles.append(i)
        if not convertCodec.ish264(f"{OUT_PATH}/clip{i}.mp4") or not convertCodec.ish264(f"{OUT_PATH}/neutclip{i}.mp4")):
            print(f"neut(?)clip{i} is incorrect codec, rerendering...")
            missingFiles.append(i)



        numThreads = 4

        def thread_func(thread_num):
            for i in range(thread_num, len(missingFiles), numThreads):
                convertSlptToClip.convertSlptToClip(missingFiles[i], count)


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


        if os.path.exists(f"{OUT_PATH}/clip{i}.mp4") and os.path.exists(f"{OUT_PATH}/neutclip{i}.mp4") and convertCodec.ish264(f"{OUT_PATH}/clip{i}.mp4") and convertCodec.ish264(f"{OUT_PATH}/neutclip{i}.mp4"):
            clips.append({
                "clipSrc": f"clip{i}",
                "neutclipSrc": f"neutclip{i}",
                "slp": highlight['path'],
                'gameStation': highlight.get('gameStation'),
                "character": highlight['character'],
                'player': highlight.get('player'),
            })

    #get past player data
    with open(f"{OUT_PATH}/server/clips.json", "r") as f:
        oldClips = json.load(f)

    #populate with past player data
    for i, clip in enumerate(oldClips):
        if clip.get('player'):
            if clip['slp'] == clips[i]['slp']:
                clips[i]['player'] = clip['player']

    #update player data
    with open(f"{OUT_PATH}/clips.json", "w") as file:
        json.dump(clips, file, indent=2)

