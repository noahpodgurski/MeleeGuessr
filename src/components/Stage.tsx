import { useEffect, useMemo, useState } from "react";
import { shuffleArray } from "../utils/Shuffle";
import './Stage.css';

export type StageType = {
  clipSrc: string; //url? or video file?
  questionedObject: string;
  incorrectChoices: Choice[];
  correctChoice: Choice;
}

export type Choice = string;

interface StageProps {
  stage: StageType;
  handleChoice: (choice:Choice, correctChoice:Choice) => void
}

export const Stage: React.FC<StageProps> = ({stage, handleChoice}) => {
  const randomChoices = useMemo<Choice[]>(() => {
    const choices = stage.incorrectChoices;
    if (!choices.includes(stage.correctChoice))
    choices.push(stage.correctChoice);
    return shuffleArray(choices);
  }, [useEffect, handleChoice])

  return (
    <>
      <video className="clip" width="auto" height="auto" autoPlay loop muted>
        <source src={stage.clipSrc} type="video/mp4"/>
      </video>
      <div className="row justify-content-center mt-5" style={{textAlign: 'center'}}>
        <h2 className="white-text">Who is the {stage.questionedObject}?</h2>
      </div>
      <div className="btn-group shadow-0 mt-5" role="group" aria-label="Basic example">
        { randomChoices.map((choice) => {
          return <button onClick={() => handleChoice(choice, stage.correctChoice)} type="button" className="btn btn-outline-secondary" data-mdb-color="dark">{choice}</button>
        })}
      </div>
    </>
  )
}