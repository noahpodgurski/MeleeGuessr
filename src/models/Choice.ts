import { Character } from "./Character";

export type Choice = {
  label: string;
  color?: string;
  aliases?: string[];
  characters?: Character[];
  score?: number;
}