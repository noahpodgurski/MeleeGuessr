import { createSignal, createEffect } from "solid-js";
import { Viewer } from "~/components/viewer/Viewer";

import "./Play.scss";
import "~/state/fileStore";
import "~/state/replayStore";
import "~/state/selectionStore";
import { load } from "~/state/fileStore";
import { currentSelectionStore } from "~/state/selectionStore";
import { setStartFrame } from "~/state/replayStore";
import {
  GameType,
  goNext,
  makeGuess,
  play,
  playStore,
  setGameType,
} from "~/state/playStore";
import { useLoader } from "~/components/common/Loader";
import { characterNameByExternalId } from "~/common/ids";
import { Choices } from "~/components/Choices";
import toast from "solid-toast";
import {
  Button,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@suid/material";
import { useNavigate } from "@solidjs/router";

export type PlayData = {
  stage: number;
  wasCorrect: boolean;
  choice: string;
  correctChoice?: string;
};

export const Play = () => {
  const [selected, setSelected] = createSignal(false);
  const [loading, { setLoading }] = useLoader();
  const navigate = useNavigate();

  createEffect(async () => {
    try {
      if (!playStore.currentClip) {
        setLoading(true);
        await play(navigate);
        await doPlay();
        // setLoading(false);
      } else {
        setSelected(true);
      }
      // if (clips.length === 0) {
      //   // const fetchData = async () => {
      //   //   // await getClips(); //todo
      //   // };
      //   // fetchData();
      // }
    } catch (e) {
      toast("Something went wrong. Try again later");
    }
  });

  const _goNext = async () => {
    await goNext(navigate);
    await doPlay();
  };

  const _setGameType = async (gameType: GameType) => {
    setLoading(true);
    await setGameType(gameType, navigate);
    await doPlay();
  };

  const doPlay = async () => {
    if (!playStore.currentClip) return;
    const isDebug = playStore.sessionId === "DEBUG";
    // const url = playStore.currentClip.path;
    // const url =
    //   `http://192.168.1.111:8000/v${import.meta.env.VITE_VERSION}/converted/cut/${playStore.currentClip.path}`;
    //   playStore.currentClip.path;
    const url = isDebug
      ? playStore.currentClip.path
      : `https://meleeguessr-v${import.meta.env.VITE_VERSION.replace(
          ".",
          "-"
        )}-clips.s3.amazonaws.com/${playStore.currentClip.path}`;
    const startFrame = Math.max(playStore.currentClip.startFrame, 0);
    setStartFrame(startFrame);
    if (url !== null) {
      try {
        void fetch(url)
          .then(async (response) => await response.blob())
          .then((blob) => new File([blob], url))
          .then(async (file) => {
            await load([file], startFrame);
            const _file = currentSelectionStore().data.filteredStubs;
            if (_file.length > 0) {
              await currentSelectionStore().select(_file[0]);
              setSelected(true);
            } else {
              toast(`Something went wrong. Please try again later`);
            }
          })
          .catch((e) => {
            toast(`Something went wrong. Please try again later ${e}`);
          });
      } catch (e) {
        toast("Error: could not load replay");
      }
    }
  };

  const [_, setShowAnswers] = createSignal(true);
  const [answer, setAnswer] = createSignal("");
  let correct = false;

  const guess = async (choice: string) => {
    setLoading(true);
    const response = await makeGuess(choice, navigate);
    if (response) {
      correct = response.data.message === "Correct";
      setAnswer(response.data.data);
      setShowAnswers(true);
    }
    setLoading(false);
    //show correct answers for 2 seconds
    await new Promise((r) => setTimeout(r, 2000));
    //todo request next while showing answers
    setLoading(true);
    setAnswer("");
    await play(navigate);
    await doPlay();
  };

  return (
    <>
      <div class="justify-content-center align-items-center play nav-m mt-5">
        <Grid sx={{ alignItems: "center", width: "100%" }}>
          <Grid container justifyContent="center" alignItems="center">
            <Typography variant="h6" sx={{ mr: 1 }}>
              Guess the:
            </Typography>
            <ToggleButtonGroup
              color="primary"
              value={playStore.gameType}
              exclusive
              onChange={(event, newAlignment) => {
                _setGameType(newAlignment);
              }}
            >
              <ToggleButton value="Player">Player</ToggleButton>
              <ToggleButton value="Controller">Controller</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Viewer />
          <Grid style={{ "text-align": "center" }}>
            {playStore.currentClip && selected() && (
              <h2 class="white-text">
                {playStore.gameType === "Player" &&
                  `Who ${
                    playStore.currentClip.characterId === 14 ? "are" : "is"
                  } the ${
                    characterNameByExternalId[
                      playStore.currentClip?.characterId
                    ]
                  }?`}
                {playStore.gameType === "Controller" &&
                  `What's the controller?`}
              </h2>
            )}
            {/* { playStore.sessionId === "DEBUG" && <><p>{playStore.currentClip?.path}</p><p>{playStore.currentClip?.gameStation}</p></>} */}
          </Grid>
          <Grid
            sx={{ mt: 1 }}
            style={{
              "text-align": "center",
              "justify-content": "space-around",
              display: "flex",
            }}
          >
            {selected() && <Choices guess={guess} answer={answer} />}
          </Grid>
          <Grid
            sx={{ mt: 1 }}
            style={{
              "text-align": "center",
              "justify-content": "center",
              display: "flex",
            }}
          >
            {playStore.sessionId === "DEBUG" && (
              <Button
                disabled={loading()}
                onClick={() => {
                  _goNext();
                }}
                color="primary"
                variant="contained"
              >
                Go Next
              </Button>
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
};
