import { createContext } from "react";

interface ILives {
  lives: number;
  setLives: (x:number) => void;
}

export const LivesContext = createContext<ILives>({
  lives: 3,
  setLives: () => {}
});