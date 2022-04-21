import { Character } from "./Character";

type conditionalCharacter = {
  [key: string]: Character[];
}

export type Choice = {
  label: string;
  color?: string;
  aliases?: string[];
  characters?: Character[];
  conditionalCharacters?: conditionalCharacter;
  flag?: string;
  score?: number;
}