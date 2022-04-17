import { Character } from "../models/Character";
import { Clip } from "../models/Clip";
import { Player } from "../consts/Player";
import { createContext } from "react";

interface IClips {
  Clips: Clip[];
  getClips: () => Promise<void>;
}

export const ClipsContext = createContext<IClips>({
  Clips: [],
  getClips: async () => {}
});

// [
//   {
//     clipSrc: "http://localhost:4000/video/clip0",
//     player: Player.LSD,
//     character: Character.Marth
//   }
// ]