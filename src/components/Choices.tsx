import { playStore } from "~/state/playStore";
import { Button } from "@suid/material";
import { Accessor } from "solid-js";

export interface IChoices {
  guess: (x: string) => {};
  answer: Accessor<string>;
}

export const Choices = (props: IChoices) => {
  const { guess, answer } = props;
  console.log(answer)
  return (
    <>
    { playStore.currentClip?.choices && playStore.currentClip.choices.map((choice, i) => {
      return <Button onClick={() => guess(choice)} color={choice.toLowerCase() === answer().toLowerCase() ? "success" : "secondary"} variant="contained">{choice}</Button>
      // return <button onClick={() => intintHandleChoice(choice, stage.correctChoice)} type="button" class={choice.color ? `btn btn-${!showAnswers ? 'outline-' : ''}${choice.color}` : `btn btn-${!showAnswers ? 'outline-' : ''}${randomColor()}`} data-mdb-color="dark">{choice.label}</button>
    })}
    </>
  )
};