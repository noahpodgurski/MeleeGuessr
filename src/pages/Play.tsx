import { createSignal, createEffect } from "solid-js";
import { STARTING_STOCKS } from "../App";
import { StocksContext } from "../components/common/Stocks";
import { Clip } from "../models/Clip";
import { StageType } from "~/components/Stage";
import { Viewer } from "~/components/viewer/Viewer";

import "~/state/fileStore";
import "~/state/replayStore";
import "~/state/selectionStore";
import { load } from "~/state/fileStore";
import { currentSelectionStore } from "~/state/selectionStore";
import { setStartFrame } from "~/state/replayStore";
import { play, playStore, setClipIndex, setClips } from "~/state/playStore";
import { useLoader } from "~/components/common/Loader";
import { characterNameByExternalId } from "~/common/ids";
import { Button, Input, TextField, Typography } from "@suid/material";

export type PlayData = {
  stage: number;
  wasCorrect: boolean;
  choice: string;
  correctChoice?: string;
};

let playData: PlayData[] = [];
let clips: Clip[] = [];

const BASE_POINTS = 1;
const NO_HINT_POINTS = 2;

export const Play = () => {
  
  const [stage, setStage] = createSignal(0);
  const [showChoiceResult, setShowChoiceResult] = createSignal(false);
  const [HS, setHS] = createSignal(false);
  const [currStage, setCurrStage] = createSignal<StageType | null>(null);
  const [, {setLoading}] = useLoader();
  
  createEffect(async () => {
    await play();
    await doPlay();
    if (!playStore.clips[playStore.clipIndex]) {
      setLoading(true);
      setLoading(false);
    }
    // if (clips.length === 0) {
    //   // const fetchData = async () => {
    //   //   // await getClips(); //todo
    //   // };
    //   // fetchData();
    // }
  });

  


  const doPlay = async () => {
    console.log(playStore.clipIndex)
    if (playStore.clips[playStore.clipIndex].playerName?.name !== "" || playStore.clips[playStore.clipIndex].playerName?.name === "skip") {
      setClipIndex(playStore.clipIndex+1);
      return doPlay();
    }
    const url = playStore.clips[playStore.clipIndex].path.replace("\\\\NOAH-PC\\Clout\\Backups\\MeleeGuessrSlp", "http://192.168.1.111:8000")
    console.log(url);
    try {
      void fetch(url)
        .then(async (response) => await response.blob())
        .then((blob) => new File([blob], url))
        .then(async (file) => {
          // toast.promise(load([file], startFrame), {
          //   loading: "Parsing files...",
          //   success: "Successfully loaded files",
          //   error: "error"
          // })
          if (playStore.clips.length < 1) return;
          const startFrame = playStore.clips[playStore.clipIndex].startFrame;
          setStartFrame(startFrame);

          await load([file], startFrame)
          const _file = currentSelectionStore().data.filteredStubs;
          if (_file.length > 0) {
            await currentSelectionStore().select(_file[0]);
          }
        });
    } catch (e) {
      console.error("Error: could not load replay", url, e);
    }

  }

  const categorize = async (e: any) => {
    if (e.key === "Enter") {
      console.log(e.target.value)
      let clips = JSON.parse(JSON.stringify(playStore.clips));
      clips[playStore.clipIndex]!.playerName!.name = e.target.value;
      setClips(clips);
      console.log(playStore.clips[playStore.clipIndex])
      setClipIndex(playStore.clipIndex+1)
      doPlay();
      e.target.value = "";
    }
  }

  const saveJSONFile = () => {
    const jsonData = JSON.stringify(playStore.clips, null, 2); // Convert data to a JSON string with indentation
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div class="d-flex justify-content-center align-items-center mt-5" style={{ height: "100%", "max-width": "90vh", margin: "auto"}}>
      <div class="row justify-content-center w-100">
        <Viewer />
      </div>
      <Typography>
        {playStore.clips?.length > 0 && playStore.clips[playStore.clipIndex]?.startFrame} - 
        {playStore.clips?.length > 0 && playStore.clips[playStore.clipIndex]?.endFrame}
          --- Guess {playStore.clips?.length > 0 && playStore.clips[playStore.clipIndex]?.portToGuess}
      </Typography>
      <Typography>
        Color: {playStore.clips?.length > 0 && playStore.clips[playStore.clipIndex]?.characterColor}
      </Typography>
      <Typography>
        Tournament: {playStore.clips?.length > 0 && playStore.clips[playStore.clipIndex]?.tournament}
      </Typography>
      <Typography>
        {playStore.clips?.length > 0 && playStore.clips[playStore.clipIndex]?.path}
      </Typography>
      <Typography>
        {playStore.clips?.length > 0 && playStore.clips[playStore.clipIndex]?.ogPath}
      </Typography>
      <div class="row mt-4" style={{"text-align": 'center', 'justify-content': 'space-around', 'display': 'flex'}}>
        <TextField variant="standard" color="success" focused onKeyDown={categorize} />
        <Button onClick={saveJSONFile} variant="contained" color="primary">Save highlights</Button>
      </div>
    </div>
  );
};
