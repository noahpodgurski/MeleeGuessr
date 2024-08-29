import json
import os

clips_url = "C:/Users/Noah/Documents/Programming/Websites/MeleeGuessr/server/clips.json"
clips_path = "C:/Users/Noah/Documents/Programming/Websites/MeleeGuessr/server/assets"
with open(clips_url, "r") as f:
    clips = json.load(f)

# print(clips)
go = True
while go:
    x = input("Enter clip number ")
    try:
        x = int(x)
    except:
        print("Invalid clip number")
        continue

    for clip in clips:
        if clip['clipSrc'] == f'clip{x}':
            foundClip = clip
    if not foundClip:
        print('Could not find this clip')
        continue


    print(foundClip)
    if (foundClip.get('player')):
        print(f"This clip already has {foundClip['player']} set")

    player = input("Enter player, or enter blank to go back ")
    if player == "":
        continue

    elif player == "del":
        #delete slp
        os.remove(foundClip['slp'])
        #delete clip
        os.remove(f"{clips_path}/clip{x}.mp4")
        os.remove(f"{clips_path}/neutclip{x}.mp4")

        #remove from clips.json
        clips.pop(x)
        with open(clips_url, "w") as f:
            json.dump(clips, f, indent=2)

        continue

    foundClip['player'] = player
    with open(clips_url, "w") as f:
        json.dump(clips, f, indent=2)