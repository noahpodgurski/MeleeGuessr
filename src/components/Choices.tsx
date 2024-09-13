import { playStore } from "~/state/playStore";
import { Button } from "@suid/material";
import { Accessor } from "solid-js";
import { useLoader } from "./common/Loader";

export interface IChoices {
  guess: (x: string) => {};
  answer: Accessor<string>;
}

export const Choices = (props: IChoices) => {
  const { guess, answer } = props;
  const [loading, ] = useLoader();
  return (
    <>
    { playStore.currentClip?.choices && playStore.currentClip.choices.map((choice, i) => {
      return <Button disabled={loading() || (answer() !== "" && choice.toLowerCase() !== answer().toLowerCase())} onClick={() => {if (answer() === "") guess(choice)}} color={choice.toLowerCase() === answer().toLowerCase() ? "success" : "secondary"} variant="contained">{choice}</Button>
    })}
    </>
  )
};