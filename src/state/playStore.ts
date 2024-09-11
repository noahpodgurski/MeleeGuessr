import axios, { AxiosResponse } from "axios";
const SERVER_IP = "https://64vwhnl0nk.execute-api.us-east-1.amazonaws.com/Prod";
// todo - move to .env or something

import { createStore } from "solid-js/store";
import toast from "solid-toast";
import AuthService from "~/services/auth.service";
import { setLoginModal } from "~/components/Navbar";
import { useLoader } from "~/components/common/Loader";
import { Navigator } from "@solidjs/router";
import { setLoaderType } from "~/components/Loader";
import { pause } from "./replayStore";
export interface PlayStore {
    currentClip?: {
        path: string,
        startFrame: number,
        endFrame: number,
        playerName?: {
            code: string,
            name: string,
        },
        characterId: number,
        characterColor: number,
        oppCharacterId: number,
        oppPlayerName?: {
            code: string,
            name: string,
        },
        oppCharacterColor: number,
        portToGuess: number,
        choices: string[]
    },
    sessionId?: string,
    score?: number,
}

const [state, setState] = createStore<PlayStore>();

export const playStore = state;
export const clearPlayStore = () => {
  setState("currentClip", undefined);
  setState("sessionId", undefined);
  setState("score", undefined);
}

export async function play(nav: Navigator): Promise<AxiosResponse | null> {
  let headers: any = {};
  let params: any = {};
  setLoaderType(false);
  pause();
  if (localStorage.getItem("user")) {
    headers.authorization = `Bearer ${localStorage.getItem("user")}`;
  }
  params.sessionId = playStore.sessionId || localStorage.getItem("session");
  const [loading, {setLoading}] = useLoader();
  return await axios.get(`${SERVER_IP}/play`, {headers, params})
  .then((response) => {
    setState("currentClip", response.data.data.currentClip);
    setState("sessionId", response.data.data.sessionId);
    setState("score", response.data.data.score);
    localStorage.setItem("session", response.data.data.sessionId);
    setLoading(false);
    return response;
  })
  .catch((err) => {
    nav("/");
    setLoading(false);
    if (err.response.data.message === "Token expired" || err.response.data.message === "Invalid token") {
      //show login modal
      toast('Session expired, please login again');
      setLoginModal(true);
      AuthService.logout();
    } else {
      toast("Something went wrong, please try again");
    }
    return null;
  });
}

export async function makeGuess(guess: string, nav: Navigator): Promise<AxiosResponse | null> {
  const [loading, {setLoading}] = useLoader();
  setLoaderType(true);
  let headers: any = {};
  if (localStorage.getItem("user")) {
    headers.authorization = `Bearer ${localStorage.getItem("user")}`;
  }
  return await axios.post(`${SERVER_IP}/guess`, {guess, sessionId: state.sessionId}, {headers})
  .then((response) => {
    if (response.data.message === "Correct") {
      setState("score", (state.score ?? 0)+1);
    }
    setLoading(false);
    return response;
  })
  .catch((err) => {
    nav("/");
    setLoading(false);
    if (err.response.data.message === "Token expired" || err.response.data.message === "Invalid token") {
      //show login modal
      toast('Session expired, please login again');
      setLoginModal(true);
      AuthService.logout();
    } else {
      toast('Something went wrong. Please try again');
    }
    return null;
  });
}