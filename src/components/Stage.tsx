import { useEffect, useMemo, useState } from "react";
import { randomColor } from "../consts/Colors";
import { Choice } from "../models/Choice";
import { shuffleArray } from "../utils/Shuffle";
import './Stage.css';

export type StageType = {
  clipSrc: string; //url? or video file?
  character: string;
  incorrectChoices: Choice[];
  correctChoice: Choice;
}


interface StageProps {
  stage: StageType;
  handleChoice: (choice:Choice, correctChoice:Choice) => void
  stageIndex: number;
}

export const Stage: React.FC<StageProps> = ({stage, handleChoice, stageIndex}) => {
  const [videoData, setVideoData] = useState<any>(null);

  const randomChoices = useMemo<Choice[]>(() => {
    const choices = stage.incorrectChoices;
    if (!choices.includes(stage.correctChoice))
      choices.push(stage.correctChoice);
    return shuffleArray(choices);
  }, [stage])

  
  const [isLoading, setLoading] = useState(false);

  const requestMetadata = async () => {
    const res = await fetch(`${stage.clipSrc}/data`);
    const data = await res.json();
    setVideoData(data);
  }

  function fakeRequest() {
    setLoading(true);
    return new Promise((resolve) => setTimeout(() => resolve(null), 500));
  }

  // useEffect(() => {
  //   requestMetadata().then(() => {
  //     setLoading(false);
  //   });
  // }, [stageIndex]);

  console.log(isLoading)

  return (
    <>
      <div className="row justify-content-center p-0">
        { isLoading ? <div className="loader"></div> :
        <video key={stage.clipSrc} className="clip" autoPlay loop muted>
          <source src={`http://localhost:4000/video/${stage.clipSrc}`} type="video/mp4" />
        </video> }
      </div>
      <div className="row justify-content-center mt-4" style={{textAlign: 'center'}}>
        {/* { !isLoading && <h2 className="white-text">{JSON.stringify(videoData)}</h2> } */}
        { !isLoading && <h2 className="white-text">Who is the {stage.character}?</h2> }
      </div>
      <div className="btn-group shadow-0 mt-3 justify-content-center" role="group" aria-label="Basic example">
        { !isLoading && randomChoices.map((choice, i) => {
          return <button key={`${stageIndex}/${i}`} onClick={() => handleChoice(choice, stage.correctChoice)} type="button" className={choice.color ? `btn btn-outline-${choice.color}` : `btn btn-outline-${randomColor()}`} data-mdb-color="dark">{choice.label}</button>
        })}
      </div>
    </>
  )
}