import { Clip } from "../models/Clip";
import { createContext } from "react";

export interface IClips {
  Clips: Clip[];
  getClips: () => Promise<void>;
}

export const ClipsContext = createContext<IClips>({
  Clips: [],
  getClips: async () => {}
});