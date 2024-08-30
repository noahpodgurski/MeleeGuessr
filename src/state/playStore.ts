import axios, { AxiosResponse } from "axios";
import { createStore } from "solid-js/store";
export interface PlayStore {
    clips: [{
        path: string,
        startFrame: number,
        endFrame: number,
        gameStartAt?: string;
        gameStation?: string;
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
        choices: string[],
        tournament?: string;
        ogPath?: string;
    }],
    clipIndex: number;
}

const [state, setState] = createStore<PlayStore>([] as any);

export const playStore = state;
export async function play(): Promise<AxiosResponse> {
  return await axios.get(`../slp-test/highlights.json`)
  .then((response) => {
    console.log(response)
    setState("clips", response.data);
    setState("clipIndex", 0);
    return response;
  });
}

export const setClipIndex = (n: number) => {
  console.log(n)
  setState("clipIndex", n)
}

export const setClips = (clips: any) => {
  setState("clips", clips);
}

// export async function makeGuess(guess: string): Promise<AxiosResponse> {
  // let headers: any = {};
  // if (userStore.data) {
  //   headers.authorization = `Bearer ${userStore.data}`;
  // }
  // return await axios.post(`${SERVER_IP}/guess`, {guess, sessionId: state.sessionId}, {headers})
  // .then((response) => {
  //   console.log(response.data);
  //   return response;
  // });
// }