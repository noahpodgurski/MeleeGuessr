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
import { replayStore, setStartFrame } from "~/state/replayStore";
import { play, playStore } from "~/state/playStore";
import { loadFromCloud } from "~/cloudClient";

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
  
  createEffect(async () => {
    await play();
    doPlay();
    // if (clips.length === 0) {
    //   // const fetchData = async () => {
    //   //   // await getClips(); //todo
    //   // };
    //   // fetchData();
    // }
  });

  const schliceClip = () => {
    if (clips.length !== 0) {
      const [clip, slicedIndex] = RandomChoice(clips) as [Clip, number];
      clips.splice(slicedIndex, 1);
      updateStage(clip);
    }
  };

  createEffect(() => {
    if (StocksContext.stocks === STARTING_STOCKS) {
      const _clips = ClipsContext.Clips.filter((clip: Clip) => clip?.player.label !== "TEST");
      clips = _clips;
      schliceClip();
    }
  });

  createEffect(() => {
    schliceClip();
  });

  const handleChoice = (choice: Choice, correctChoice: Choice) => {
    setTimeout(() => {
      if (choice.label === correctChoice.label) {
        setScore(score() + BASE_POINTS);
        playData.push({
          stage: stage(),
          wasCorrect: true,
          choice: choice.label,
        });
      } else {
        playData.push({
          stage: stage(),
          wasCorrect: false,
          choice: choice.label,
          correctChoice: correctChoice.label,
        });
        StocksContext.stocks--;
      }

      if (UserContext.user?.id) {
        UserService.updateStats({
          userId: UserContext.user.id,
          username: UserContext.user.username,
          wasCorrect: choice.label === correctChoice.label,
          score: choice.label === correctChoice.label ? score() + BASE_POINTS : score(),
          final: choice.label !== correctChoice.label && StocksContext.stocks === 1,
        });
      }
      setStage(stage() + 1);
    }, choiceTime);
  };

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

    // const url = "../slp-test/test.slp";
    if (!playStore.currentClip) return;
    const url = playStore.currentClip.path;
    const startFrame = playStore.currentClip.startFrame;
    setStartFrame(startFrame);
    if (url !== null) {
      try {
        void fetch(`https://meleeguessr-v2-clips.s3.amazonaws.com/${url}`)
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
            }
          });
      } catch (e) {
        console.error("Error: could not load replay", url, e);
      }
    }

  }

  const updateStage = (clip: Clip) => {
    const incorrectChoices: Choice[] = [];

    const randomPlayers: string[] = shuffleArray(Object.keys(Player));
    for (const player of randomPlayers) {
      const characters = Player[player].characters || [];
      const conditionalCharacters = Player[player].conditionalCharacters || {};
      const clipChar = clip?.character || Character.Bowser;
      const oppChar = clip?.oppChar || Character.Bowser;

      const _ = conditionalCharacters[clipChar] || [];

      if (
        player !== clip?.player.label &&
        player !== Player["TEST"].label &&
        (characters.includes(clipChar) || _.includes(oppChar))
      ) {
        incorrectChoices.push(Player[player]);

        if (incorrectChoices.length >= 3) break;
      }
    }
    setCurrStage({
      clipSrc: clip?.clipSrc || "",
      character: clip?.character || "",
      correctChoice: clip?.player || Player.TEST,
      incorrectChoices: incorrectChoices,
    });
  };

  const reportClip = () => {
    // UserService.reportClip(currStage()?.clipSrc)
    //   .then((data: any) => {
    //     if (data.status === "success") {
    //       createToast({
    //         title: data.message,
    //         duration: 2000,
    //         placement: "top-end"
    //       })
    //     } else {
    //       createToast({
    //         title: data.message,
    //         duration: 2000,
    //         placement: "top-end"
    //       })
    //     }
    //   })
    //   .catch((err: any) => {
    //     createToast({
    //       title: err.response.data.message,
    //       duration: 2000,
    //       placement: "top-end"
    //     })
    //   });
  };

  const reset = () => {
    playData = [];
    clips = [];

    setStage(0);
    setScore(0);
    StocksContext.stocks = STARTING_STOCKS;
    setShowChoiceResult(false);
    setHS(false);
  };

  const hands = createMemo(() => {
    const _hands = [];
    for (let i = 0; i < StocksContext.stocks; i++) {
      _hands.push(<img class="hand" alt="hand" src={"/logo.png"} />);
    }
    return _hands;
  });

  return (
    <div class="d-flex justify-content-center align-items-center mt-5" style={{ height: "100%", "max-width": "100vh", margin: "auto"}}>
      <div class="row justify-content-center w-100">
        <Viewer />
      </div>
    </div>
  );
};
