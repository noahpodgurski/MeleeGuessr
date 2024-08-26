import axios, { AxiosResponse } from "axios";
const SERVER_IP = "https://64vwhnl0nk.execute-api.us-east-1.amazonaws.com/Prod";
// todo - move to .env or something

import { createStore } from "solid-js/store";
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
        portToGuess: number
    },
    sessionId?: string
}

const [state, setState] = createStore<PlayStore>();

export const playStore = state;
export async function play(): Promise<AxiosResponse> {
  return await axios.get(`${SERVER_IP}/play`)
  .then((response) => {
    setState("currentClip", response.data.data.currentClip);
    setState("sessionId", response.data.data.sessionId);
    return response;
  });
}
