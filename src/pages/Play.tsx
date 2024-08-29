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
import { makeGuess, play, playStore } from "~/state/playStore";
import { useLoader } from "~/components/common/Loader";
import { characterNameByExternalId } from "~/common/ids";
import { Choices } from "~/components/Choices";
import toast from "solid-toast";
import { Grid } from "@suid/material";

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
  
  const [selected, setSelected] = createSignal(false);
  const [score, setScore] = createSignal(0);
  const [showChoiceResult, setShowChoiceResult] = createSignal(false);
  const [HS, setHS] = createSignal(false);
  const [currStage, setCurrStage] = createSignal<StageType | null>(null);
  const [loading, {setLoading}] = useLoader();
  
  createEffect(async () => {
    if (!playStore.currentClip) {
      setLoading(true);
      await play();
      await doPlay();
      setLoading(false);
    } else {
      setSelected(true);
    }
    // if (clips.length === 0) {
    //   // const fetchData = async () => {
    //   //   // await getClips(); //todo
    //   // };
    //   // fetchData();
    // }
  });

  const doPlay = async () => {
    // 1. doPlay (request at /play)
    // 2. 
    // const url = new URLSearchParams(location.search).get("replayUrl");
    const isDebug = true;
    if (!playStore.currentClip) return;
    // const url = "../slp-test/test.slp";
    const url = isDebug ? "../slp-test/test3.slp" : `https://meleeguessr-v2-clips.s3.amazonaws.com/${playStore.currentClip.path}`;
    const startFrame = isDebug ? 0 : Math.max(playStore.currentClip.startFrame, 0);
    console.log(startFrame)
    setStartFrame(startFrame);
    if (url !== null) {
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

            await load([file], startFrame)
            const _file = currentSelectionStore().data.filteredStubs;
            if (_file.length > 0) {
              await currentSelectionStore().select(_file[0]);
              setSelected(true);
            } else {
              toast("Something went wrong. Please try again later")
            }
          });
      } catch (e) {
        console.error("Error: could not load replay", url, e);
      }
    }

  }
  
  const [showAnswers, setShowAnswers] = createSignal(true);
  const [answer, setAnswer] = createSignal("")
  let correct = false;

  const guess = async (choice: string) => {
    setLoading(true);
    const response = await makeGuess(choice);
    correct = response.data.message === "Correct";
    setAnswer(response.data.data);
    setShowAnswers(true);
    setLoading(false);
    //show correct answers for 2 seconds
    await new Promise((r) => setTimeout(r, 2000));
    //todo request next while showing answers
    setAnswer("");
    await play();
    await doPlay();
  }

  return (
    <div class="justify-content-center align-items-center mt-5" style={{ height: "100%", "max-width": "90vh", margin: "auto", display: 'flex'}}>
      <Grid sx={{alignItems: 'center', width: '100%'}}>
        <Grid>
          <Viewer />
        </Grid>
        <Grid style={{"text-align": 'center'}}>
          { playStore.currentClip && !loading() && selected() && <h2 class="white-text">Who is the {characterNameByExternalId[playStore.currentClip?.characterId]}?</h2> }
        </Grid>
        <Grid sx={{mt: 1}} style={{"text-align": 'center', 'justify-content': 'space-around', 'display': 'flex'}}>
          { selected() && <Choices guess={guess} answer={answer} />}
        </Grid>
      </Grid>
    </div>
  );
};
