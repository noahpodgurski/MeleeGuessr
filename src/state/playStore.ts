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
        choices: string[]
    }]
}

const [state, setState] = createStore<PlayStore>([] as any);

export const playStore = state;
export async function play(): Promise<AxiosResponse> {
  return await axios.get(`../slp-test/highlights.json`)
  .then((response) => {
    console.log(response)
    setState("clips", response.data.queue);
    return response;
  });
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