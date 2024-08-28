import { createSignal, createEffect, createMemo } from "solid-js";
import { STARTING_STOCKS } from "../App";
import { ClipsContext } from "../components/common/Clips";
import { Character } from '../models/Character';
import { Player } from "../consts/Player";
import { StocksContext } from "../components/common/Stocks";
import { UserContext } from "../components/common/User";
import { Choice } from "../models/Choice";
import { Clip } from "../models/Clip";
import UserService from "../services/user.service";

import { choiceTime } from "../consts/Time";
import { shuffleArray } from "../utils/Shuffle";
import { RandomChoice } from "../utils/RandomChoice";
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
import { Button } from "@suid/material";
import { Choices } from "~/components/Choices";

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
  const [score, setScore] = createSignal(0);
  const [showChoiceResult, setShowChoiceResult] = createSignal(false);
  const [HS, setHS] = createSignal(false);
  const [currStage, setCurrStage] = createSignal<StageType | null>(null);
  const [, {setLoading}] = useLoader();
  
  createEffect(async () => {
    if (!playStore.currentClip) {
      setLoading(true);
      await play();
      await doPlay();
      setLoading(false);
    }
    // if (clips.length === 0) {
    //   // const fetchData = async () => {
    //   //   // await getClips(); //todo
    //   // };
    //   // fetchData();
    // }
  });

  

  createEffect(() => {
    const x = Number(localStorage.getItem("HS"));
    if (StocksContext.stocks === 0) {
      if (x === null || x < score()) {
        setHS(true);
        localStorage.setItem("HS", score().toLocaleString());
      }
      setShowChoiceResult(true);
    }
  });

  const doPlay = async () => {
    // 1. doPlay (request at /play)
    // 2. 
    // const url = new URLSearchParams(location.search).get("replayUrl");

    if (!playStore.currentClip) return;
    // const url = "../slp-test/test.slp";
    const debug = false;
    const url = debug ? '../slp-test/test.slp' : `https://meleeguessr-v2-clips.s3.amazonaws.com/${playStore.currentClip.path}`;
    const startFrame = playStore.currentClip.startFrame;
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

            await load([file], debug ? 0 : startFrame)
            const _file = currentSelectionStore().data.filteredStubs;
            if (_file.length > 0) {
              await currentSelectionStore().select(_file[0]);
            }
          });
      } catch (e) {
        console.error("Error: could not load replay", url, e);
      }
    }

  }

  const reset = () => {
    playData = [];
    clips = [];

    setStage(0);
    setScore(0);
    StocksContext.stocks = STARTING_STOCKS;
    setShowChoiceResult(false);
    setHS(false);
  };
  
  const [showAnswers, setShowAnswers] = createSignal(true);
  const [answer, setAnswer] = createSignal("")
  let correct = false;

  const guess = async (choice: string) => {
    const response = await makeGuess(choice);
    correct = response.data.message === "Correct";
    setAnswer(response.data.data);
    setShowAnswers(true);
    //show correct answers for 2 seconds
    await new Promise((r) => setTimeout(r, 2000));
    //todo request next while showing answers
    setLoading(true);
    await play();
    await doPlay();
    setLoading(false);
  }

  return (
    <div class="d-flex justify-content-center align-items-center mt-5" style={{ height: "100%", "max-width": "90vh", margin: "auto"}}>
      <div class="row justify-content-center w-100">
        <Viewer />
      </div>
      <div class="row justify-content-center" style={{"text-align": 'center'}}>
        { playStore.currentClip && <h2 class="white-text">Who is the {characterNameByExternalId[playStore.currentClip?.characterId]}?</h2> }
      </div>
      <div class="row mt-4" style={{"text-align": 'center', 'justify-content': 'space-around', 'display': 'flex'}}>
        <Choices guess={guess} answer={answer()} />
      </div>
    </div>
  );
};
