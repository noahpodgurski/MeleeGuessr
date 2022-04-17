import { Clip } from "../models/Clip";

export const RandomChoice = (arr:any[]):[any, number] => {
  let splicedIndex = Math.floor(Math.random()*arr.length);
  return [arr[splicedIndex], splicedIndex];
}