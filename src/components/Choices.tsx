import { Ref, createSignal, createMemo } from "solid-js";
import { choiceTime } from "../consts/Time";
import { Choice } from "../models/Choice";
import { shuffleArray } from "../utils/Shuffle";
import { RefObject, StageType } from "./Stage";

interface ChoicesProps {
  stage: StageType;
  loading?: boolean;
  stageIndex: number;
  intHandleChoice: (choice:Choice, correctChoice:Choice) => void;
}


export const Choices = (props: ChoicesProps) => {
  const { stage, stageIndex, intHandleChoice } = props;
  const [showAnswers, setShowAnswers] = createSignal(false);

  const intintHandleChoice = (choice:Choice, correctChoice:Choice) => {
    if (!showAnswers){
      setShowAnswers(true);
      intHandleChoice(choice, correctChoice);
      setTimeout(() => {
        setShowAnswers(false);
      }, choiceTime)
    }
  }

  const randomChoices = createMemo<Choice[]>(() => {
    if (stage){
      if (showAnswers()){
        const choices = stage.incorrectChoices.map((choice) => {
          if (choice.label !== stage.correctChoice.label)
            return {...choice, color: 'danger'};
          else
            return {...choice, color: 'success'};
        })
        return choices;
      }
      const choices = stage.incorrectChoices;
      if (!choices.includes(stage.correctChoice))
        choices.push(stage.correctChoice);
      return shuffleArray(choices); 
    }
    return [];
  }, [])

  return (
    <div class="btn-group shadow-0 mt-3 p-0 justify-content-center" role="group" aria-label="Basic example" style={{"overflow-y": 'hidden'}}>
    { randomChoices().map((choice, i) => {
      return <button onClick={() => intintHandleChoice(choice, stage.correctChoice)} type="button" class={choice.color ? `btn btn-${!showAnswers ? 'outline-' : ''}${choice.color}` : `btn btn-${!showAnswers ? 'outline-' : ''}danger`} data-mdb-color="dark">{choice.label}</button>
      // return <button onClick={() => intintHandleChoice(choice, stage.correctChoice)} type="button" class={choice.color ? `btn btn-${!showAnswers ? 'outline-' : ''}${choice.color}` : `btn btn-${!showAnswers ? 'outline-' : ''}${randomColor()}`} data-mdb-color="dark">{choice.label}</button>
    })}
  </div>
  )
};