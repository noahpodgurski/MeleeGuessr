import { Character } from "./Character";

type conditionalCharacter = {
  [key: string]: Character[];
}

export type Choice = {
  label: string;
  characters: Character[],
  color?: string;
  aliases?: string[];
  conditionalCharacters?: conditionalCharacter,
  flag?: string;
  score?: number;
  controllerType?: ControllerType;
}

export interface ControllerType {
  type: {
    rectangle?: "b0xx" | "smashbox" | "frame1" | "other" | boolean;
    phob?: boolean;
    oEMModded?: boolean;
    goomwave?: boolean;
  };
  mods?: {
    notches?: boolean;
    zJump?: boolean;
    snapback?: boolean;
  };
}