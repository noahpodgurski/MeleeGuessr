import axios, { AxiosResponse } from "axios";

const SERVER_IP = import.meta.env.VITE_SERVER_IP;

import { createStore } from "solid-js/store";
import toast from "solid-toast";
import AuthService from "~/services/auth.service";
import { setLoginModal } from "~/components/Navbar";
import { useLoader } from "~/components/common/Loader";
import { Navigator } from "@solidjs/router";
import { setLoaderIsHexType } from "~/components/Loader";
import { pause } from "./replayStore";

export type GameType = "Player" | "Controller";

export interface PlayStore {
  currentClip?: {
    path: string;
    startFrame: number;
    endFrame: number;
    playerName?: {
      code: string;
      name: string;
    };
    characterId: number;
    characterColor: number;
    oppCharacterId: number;
    oppPlayerName?: {
      code: string;
      name: string;
    };
    oppCharacterColor: number;
    portToGuess: number;
    choices: string[];
  };
  sessionId?: string;
  score?: number;
  gameType?: GameType;
}

const isDebug = false;
const debugFiles: any = [];
const [state, setState] = createStore<PlayStore>();
let debugIndex = 320;

export const playStore = state;
export const clearPlayStore = async () => {
  setState("currentClip", undefined);
  setState("sessionId", undefined);
  setState("score", undefined);
  setState("gameType", undefined);
};

export async function play(nav: Navigator): Promise<AxiosResponse | null> {
  let headers: any = {};
  let params: any = {};
  setLoaderIsHexType(false);
  pause();
  if (localStorage.getItem("user")) {
    headers.authorization = `Bearer ${localStorage.getItem("user")}`;
  }
  params.sessionId = playStore.sessionId || localStorage.getItem("session");
  params.gameType = playStore.gameType || "Player";
  if (params.sessionId === "undefined") {
    delete params.sessionId;
  }
  if (!params.gameType) {
    delete params.gameType;
  }
  const [_, { setLoading }] = useLoader();
  if (isDebug) {
    const cc = debugFiles[debugIndex];
    cc.path = cc.path
      .replace(
        import.meta.env.LOCAL_FOLDER_DIR,
        import.meta.env.LOCAL_SERVER_IP
      )
      .replaceAll("\\", "/");
    setState("currentClip", cc);
    setState("sessionId", "DEBUG");
    setState("score", 0);
    setState("gameType", "Player");
    localStorage.setItem("session", "DEBUG");
    return {
      data: {
        data: {
          currentClip: {
            path: cc.path,
            startFrame: cc.startFrame,
          },
          sessionId: "DEBUG",
          score: debugIndex,
        },
      },
      status: 200,
      statusText: "OK",
      headers: {},
      config: { headers },
    };
  }
  return await axios
    .get(`${SERVER_IP}/play`, { headers, params })
    .then((response) => {
      setState("currentClip", response.data.data.currentClip);
      setState("sessionId", response.data.data.sessionId);
      setState("score", response.data.data.score);
      setState("gameType", response.data.data.gameType);
      localStorage.setItem("session", response.data.data.sessionId);
      return response;
    })
    .catch((err) => {
      nav("/");
      setLoading(false);
      if (
        err.response.data.message === "Token expired" ||
        err.response.data.message === "Invalid token"
      ) {
        //show login modal
        toast("Session expired, please login again");
        setLoginModal(true);
        AuthService.logout();
      } else {
        toast("Something went wrong, please try again");
      }
      return null;
    });
}

export async function setGameType(
  gameType: GameType,
  nav: Navigator
): Promise<AxiosResponse | null> {
  setState("gameType", gameType);
  return await play(nav);
}

export async function goNext(nav: Navigator): Promise<AxiosResponse | null> {
  debugIndex++;
  return play(nav);
}

export async function makeGuess(
  guess: string,
  nav: Navigator
): Promise<AxiosResponse | null> {
  const [, { setLoading }] = useLoader();
  setLoaderIsHexType(true);
  let headers: any = {};
  if (localStorage.getItem("user")) {
    headers.authorization = `Bearer ${localStorage.getItem("user")}`;
  }
  return await axios
    .post(
      `${SERVER_IP}/guess`,
      { guess, sessionId: state.sessionId },
      { headers }
    )
    .then((response) => {
      if (response.data.message === "Correct") {
        setState("score", (state.score ?? 0) + 1);
      }
      setLoading(false);
      return response;
    })
    .catch((err) => {
      nav("/");
      setLoading(false);
      if (
        err.response.data.message === "Token expired" ||
        err.response.data.message === "Invalid token"
      ) {
        //show login modal
        toast("Session expired, please login again");
        setLoginModal(true);
        AuthService.logout();
      } else {
        toast("Something went wrong. Please try again");
      }
      return null;
    });
}
