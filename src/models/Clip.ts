import { Character } from "./Character";
import { Player, PlayerType } from "../consts/Player";
import { Choice } from "./Choice";

export type Clip = {
  clipSrc: string;
  player: Choice;
  character: Character;
}