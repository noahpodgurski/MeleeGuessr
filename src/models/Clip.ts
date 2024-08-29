import { Character } from "./Character";
import { Choice } from "./Choice";

export type Clip = {
  clipSrc: string;
  player: Choice;
  character: Character;
  slp?: string;
  oppChar?: Character;
  oppPlayer?: Choice;
}