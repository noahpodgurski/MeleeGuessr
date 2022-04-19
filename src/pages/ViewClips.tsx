import { MDBBtn } from "mdb-react-ui-kit";
import { ReactNode, useContext, useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { RefObject, Stage, StageType } from "../components/Stage";
import { Player } from "../consts/Player";
import { ClipsContext } from "../hooks/Clips";
import { ILoading, LoadingContext } from "../hooks/UseLoading";
import { StocksContext } from "../hooks/UseStocks";
import { Choice } from "../models/Choice";
import { Clip } from "../models/Clip";
import { RandomChoice } from "../utils/RandomChoice";
import { shuffleArray } from "../utils/Shuffle";

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
  const { stocks, setStocks } = useContext<any>(StocksContext);
  const { Clips, getClips } = useContext<any>(ClipsContext);
  const { loading, setLoading } = useContext<ILoading>(LoadingContext);
  const [clips, setClips] = useState<Clip[]>([])
  const [showChoiceResult, setShowChoiceResult] = useState(false);
  const [HS, setHS] = useState(false);
  const [stop,] = useState(false);  

  const stageRef = useRef<RefObject>(null);
  
  useEffect(() => {
    const _clips = Clips.filter((clip:Clip) => { return clip.player === Player.TEST });
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

  
  const displayCorrectChoice = async (choice:Choice, correctChoice:Choice) => {
    if (stageRef.current){
      stageRef.current.Test(choice);
    }
  }

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

    const [clip, slicedIndex] = RandomChoice(clips);
    setClips((clips) => {
      return clips.filter((filteredClip) => {
        return filteredClip === clip;
      })
    })

    const incorrectChoices:Choice[] = [];
  
    const randomPlayers:string[] = shuffleArray(Object.keys(Player));
    for (const player of randomPlayers){
      // player doesn't have any characters or if the player has characters
      if (player !== clip.player.label && (!Player[player].characters || Player[player].characters?.includes(clip.character))){
        incorrectChoices.push(Player[player]);
        if (incorrectChoices.length >= 3)
          break;
      }
    };
    return {
      clipSrc: clip.clipSrc,
      character: clip.character,
      correctChoice: clip.player,
      slp: clip.slp,
      incorrectChoices: incorrectChoices
    }
  }, [Clips, getClips])

  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-5" style={{height: "100%"}}>
				<div className="row justify-content-center w-100">
          
          { !stop && !showChoiceResult &&
          <>
            <div className="col-6 white-text align-items-center" style={{height: "auto", textAlign: "center"}}>
              <h1>{currStage?.clipSrc}</h1>
              <p>{currStage?.slp}</p>
            </div> 
            <Stage ref={stageRef} stage={currStage} handleChoice={handleChoice} stageIndex={stage} viewClipsOnly={true} neutral={false} />
            {/* <MDBBtn className="mt-2 w-50" color="danger" onClick={() => setShowChoiceResult(true)}>View Results</MDBBtn> */}
          </>
          }
				</div>
			</div>
    </>
  );
};