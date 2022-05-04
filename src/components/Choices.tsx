import { Ref, forwardRef, useState, useMemo } from "react";
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


export const Choices = forwardRef((props: ChoicesProps, ref: Ref<RefObject>) => {
  const { stage, stageIndex, intHandleChoice } = props;
  const [showAnswers, setShowAnswers] = useState(false);

  const intintHandleChoice = (choice:Choice, correctChoice:Choice) => {
    if (!showAnswers){
      setShowAnswers(true);
      intHandleChoice(choice, correctChoice);
      setTimeout(() => {
        setShowAnswers(false);
      }, choiceTime)
    }
  }

  const randomChoices = useMemo<Choice[]>(() => {
    if (stage){
      if (showAnswers){
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
  }, [stage, showAnswers])

  return (
    <div className="btn-group shadow-0 mt-3 p-0 justify-content-center" role="group" aria-label="Basic example" style={{overflowY: 'hidden'}}>
    { randomChoices.map((choice, i) => {
      return <button key={`${stageIndex}/${i}`} onClick={() => intintHandleChoice(choice, stage.correctChoice)} type="button" className={choice.color ? `btn btn-${!showAnswers ? 'outline-' : ''}${choice.color}` : `btn btn-${!showAnswers ? 'outline-' : ''}danger`} data-mdb-color="dark">{choice.label}</button>
      // return <button key={`${stageIndex}/${i}`} onClick={() => intintHandleChoice(choice, stage.correctChoice)} type="button" className={choice.color ? `btn btn-${!showAnswers ? 'outline-' : ''}${choice.color}` : `btn btn-${!showAnswers ? 'outline-' : ''}${randomColor()}`} data-mdb-color="dark">{choice.label}</button>
    })}
  </div>
  )
});