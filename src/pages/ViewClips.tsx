import { MDBCheckbox } from "mdb-react-ui-kit";
import { useContext, useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import { RefObject, Stage, StageType } from "../components/Stage";
import { Player } from "../consts/Player";
import { ClipsContext } from "../hooks/Clips";
import { ILoading, LoadingContext } from "../hooks/UseLoading";
import { Choice } from "../models/Choice";
import { Clip } from "../models/Clip";
import { RandomChoice } from "../utils/RandomChoice";

type PlayData = {
  stage: number;
  wasCorrect: boolean;
  choice: string;
  // only if not correct
  correctChoice?: string;
}

let playData:PlayData[] = [];
// let clips:Clip[] = [];


export const ViewClips: React.FC = () => {
  // ex: stage 1/5
  const [stage, setStage] = useState(0);
  const [score, setScore] = useState(0);
  const { Clips, getClips } = useContext<any>(ClipsContext);
  const { loading } = useContext<ILoading>(LoadingContext);
  const [clips, setClips] = useState<Clip[]>([])
  const [showChoiceResult,] = useState(false);
  const [stop,] = useState(false);  

  const stageRef = useRef<RefObject>(null);
  
  useEffect(() => {
    const _clips = Clips.filter((clip:Clip) => { return clip.player !== Player.TEST });
    console.log(_clips)
    setClips(_clips)
  }, [Clips])

  //   useEffect(() => {
  //   setClips((Clips) => {
  //     return Clips.filter((clip) => {
  //       return clip.player.label !== 'TEST';
  //     })
  //   });
  // }, [useEffect])

  // useEffect(() => {
  //   while (playData.length > 0)
  //     playData.pop();
  // }, [])

  
  const handleChoice = (choice:Choice, correctChoice:Choice) => {
    setScore(score-1);
    playData.push({
      stage: stage,
      wasCorrect: false,
      choice: choice.label
    })
    setStage(stage+1);
  };

  
  const currStage:StageType | null = useMemo(() => {
    if (loading){
      return null;
    }
    if (clips.length === 0){
      getClips();
      return null;
    }

    const [clip,] = RandomChoice(clips);
    setClips((clips) => {
      return clips.filter((filteredClip) => {
        return filteredClip !== clip;
      })
    })

    return {
      clipSrc: clip.clipSrc,
      character: clip.character,
      correctChoice: clip.player,
      slp: clip.slp,
      incorrectChoices: []
    }
  }, [getClips])

  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-5" style={{height: "100%"}}>
				<div className="row justify-content-center w-100">
          
          <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Easy Mode?' />
          { !stop && !showChoiceResult &&
          <>
            <div className="col-6 white-text align-items-center" style={{height: "auto", textAlign: "center"}}>
              <h1>{currStage?.clipSrc}</h1>
              <p>{currStage?.slp}</p>
            </div> 
            <Stage ref={stageRef} stage={currStage} handleChoice={handleChoice} stageIndex={stage} viewClipsOnly={true} />
            {/* <MDBBtn className="mt-2 w-50" color="danger" onClick={() => setShowChoiceResult(true)}>View Results</MDBBtn> */}
          </>
          }
				</div>
			</div>
    </>
  );
};