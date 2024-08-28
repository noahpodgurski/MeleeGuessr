import { playStore } from "~/state/playStore";
import { Button } from "@suid/material";

export interface IChoices {
  guess: (x: string) => {};
  answer: string;
}

export const Choices = (props: IChoices) => {
  const { guess, answer } = props;

  return (
    <>
    { playStore.currentClip && playStore.currentClip.choices.map((choice, i) => {
      return <Button onClick={() => guess(choice)} color={choice === answer ? "success" : "secondary"} variant="contained">{choice}</Button>
      // return <button onClick={() => intintHandleChoice(choice, stage.correctChoice)} type="button" class={choice.color ? `btn btn-${!showAnswers ? 'outline-' : ''}${choice.color}` : `btn btn-${!showAnswers ? 'outline-' : ''}${randomColor()}`} data-mdb-color="dark">{choice.label}</button>
    })}
    </>
  )
};