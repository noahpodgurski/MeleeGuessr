import { MDBBtn } from "mdb-react-ui-kit";
import React, { forwardRef, useContext } from "react";
import { Ref, useImperativeHandle } from "react";
import { useEffect, useMemo, useState } from "react";
import { randomColor } from "../consts/Colors";
import { Player } from "../consts/Player";
import { ILoading, LoadingContext } from "../hooks/UseLoading";
import { Choice } from "../models/Choice";
import { shuffleArray } from "../utils/Shuffle";
import './Stage.css';

export type StageType = {
  clipSrc: string; //url? or video file?
  character: string;
  incorrectChoices: Choice[];
  correctChoice: Choice;
  slp?: string;
}


interface StageProps {
  stage: StageType | null;
  handleChoice: (choice:Choice, correctChoice:Choice) => void
  stageIndex: number;
  viewClipsOnly?: boolean;
  neutral?: boolean;
}

export interface RefObject {
  Test: (choice:Choice) => void;
}

// export const Stage: React.FC<StageProps> = ({stage, handleChoice, stageIndex}) => {
export const Stage = forwardRef((props: StageProps, ref: Ref<RefObject>) => {
  const { stage, handleChoice, stageIndex, viewClipsOnly=false, neutral=false } = props;
  const [showAnswers, setShowAnswers] = useState(false);
  const { loading, setLoading } = useContext<ILoading>(LoadingContext);
  const [muted, setMuted] = useState(false);
  const [val, setVal] = useState(0);

  console.log(stage)
  console.log('stage')

  useEffect(() => {
    setVal(val+1);
  }, [loading])

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

  // const requestMetadata = async () => {
  //   const res = await fetch(`${stage.clipSrc}/data`);
  //   const data = await res.json();
  //   // setVideoData(data);
  // }

  useImperativeHandle(ref, () => ({ Test }));
  const Test = async (choice:Choice) => { 
    setShowAnswers(true);

    setTimeout(() => {
      setShowAnswers(false);
    }, 2000);
  }

  // useEffect(() => {
  //   requestMetadata().then(() => {
  //     setLoading(false);
  //   });
  // }, [stageIndex]);
  // console.log(stage)

  
  if (!stage){
    return (
      <>
        <div className="row justify-content-center p-0">
          <div className="loader"></div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="row justify-content-center p-0">
        { loading ? <div className="loader"></div> :
        <video key={stage.clipSrc} className="clip" autoPlay loop muted={muted} playsInline>
          <source src={`http://localhost:4000/video/${neutral ? 'neut' : ''}${stage.clipSrc}`} type="video/mp4" />
        </video> }
      </div>
      <div className="row justify-content-center mt-4" style={{textAlign: 'center'}}>
        {/* { !loading && <h2 className="white-text">{JSON.stringify(videoData)}</h2> } */}
        { !loading && <h2 className="white-text">Who is the {stage.character}?</h2> }
      </div>
      { viewClipsOnly ? <MDBBtn onClick={() => handleChoice(Player.TEST, stage.correctChoice)} color="success">Next</MDBBtn>
      : <div className="btn-group shadow-0 mt-3 justify-content-center" role="group" aria-label="Basic example">
        { !loading && randomChoices.map((choice, i) => {
          return <button key={`${stageIndex}/${i}`} onClick={() => handleChoice(choice, stage.correctChoice)} type="button" className={choice.color ? `btn btn-${!showAnswers ? 'outline-' : ''}${choice.color}` : `btn btn-${!showAnswers ? 'outline-' : ''}${randomColor()}`} data-mdb-color="dark">{choice.label}</button>
        })}
      </div> }
    </>
  )
});