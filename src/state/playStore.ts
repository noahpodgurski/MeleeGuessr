import axios, { AxiosResponse } from "axios";
const SERVER_IP = "https://64vwhnl0nk.execute-api.us-east-1.amazonaws.com/Prod";
// todo - move to .env or something

import { createStore } from "solid-js/store";
import { userStore } from "./userStore";
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
export async function play(): Promise<AxiosResponse> {
  let headers: any = {};
  let params: any = {};
  if (userStore.data) {
    headers.authorization = `Bearer ${userStore.data}`;
  }
  params.sessionId = playStore.sessionId || localStorage.getItem("session");
  return await axios.get(`${SERVER_IP}/play`, {headers, params})
  .then((response) => {
    setState("currentClip", response.data.data.currentClip);
    setState("sessionId", response.data.data.sessionId);
    setState("score", response.data.data.score);
    localStorage.setItem("session", response.data.data.sessionId); //todo do jwt for this too
    return response;
  });
}

export async function makeGuess(guess: string): Promise<AxiosResponse> {
  let headers: any = {};
  if (userStore.data) {
    headers.authorization = `Bearer ${userStore.data}`;
  }
  return await axios.post(`${SERVER_IP}/guess`, {guess, sessionId: state.sessionId}, {headers})
  .then((response) => {
    console.log(response.data);
    if (response.data.message === "Correct") {
      setState("score", (state.score ?? 0)+1);
    }
    return response;
  });
}