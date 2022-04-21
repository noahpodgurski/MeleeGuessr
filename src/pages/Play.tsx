import { MDBBtn, MDBBtnGroup, MDBCheckbox } from "mdb-react-ui-kit";
import { ReactNode, useContext, useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import { MeleeFont } from "../components/MeleeFont";
import { RefObject, Stage, StageType } from "../components/Stage";
// import { Clips } from "../hooks/Clips";
import { Player } from "../consts/Player";
import { choiceTime } from "../consts/Time";
import { ClipsContext, IClips } from "../hooks/Clips";
import { ILoading, LoadingContext } from "../hooks/UseLoading";
import { StocksContext } from "../hooks/UseStocks";
import { Character } from "../models/Character";
import { Choice } from "../models/Choice";
import { Clip } from "../models/Clip";
import { RandomChoice } from "../utils/RandomChoice";
import { shuffleArray } from "../utils/Shuffle";
import { Result } from "./Result";

export type PlayData = {
  stage: number;
  wasCorrect: boolean;
  choice: string;
  // only if not correct
  correctChoice?: string;
}

let playData:PlayData[] = [];
// let clips:Clip[] = [];


// const noMore: StageType = 
// {
//   clipSrc: "./clips/testClip.mp4",
//   character: "Peach",
//   correctChoice: Player.Armada,
//   incorrectChoices: [Player.Llod, Player.Polish, Player.Mew2King]
// };

const BASE_POINTS = 1;
const NO_HINT_POINTS = 2;

export const Play: React.FC = () => {
  // ex: stage 1/5
  const [stage, setStage] = useState(0);
  const [score, setScore] = useState(0);
  const { stocks, setStocks } = useContext<any>(StocksContext);
  const { Clips, getClips } = useContext<IClips>(ClipsContext);
  const { loading } = useContext<ILoading>(LoadingContext);
  const [clips, setClips] = useState<Clip[]>([])
  const [showChoiceResult, setShowChoiceResult] = useState(false);
  const [HS, setHS] = useState(false);
  const [stop,] = useState(false);

  const stageRef = useRef<RefObject>(null);
  
  // useEffect(() => {
  //   console.log('RESET')
  //   reset();
  // }, [useEffect])

  useEffect( () => {
    if (!loading && !clips){

      const fetchData = async () => {
        await getClips();
      }
      fetchData();
    }
  // }, [useEffect])
  }, [clips, getClips, loading])

  useEffect(() => {
    const _clips = Clips.filter((clip:Clip) => { return clip?.player.label !== "TEST" });
    setClips(_clips);
  }, [Clips])

  // useEffect(() => {
  //   while (playData.length > 0)
  //     playData.pop();
  // }, [])


  
  // calls child function!
  // const displayCorrectChoice = async (choice:Choice, correctChoice:Choice) => {
  //   if (stageRef.current){
  //     stageRef.current.Test(choice);
  //   }
  // }

  const handleChoice = (choice:Choice, correctChoice:Choice) => {
    let hasHint = stageRef.current?.hasHint();
    setTimeout(() => {
      if (choice.label === correctChoice.label){
        // let hasHint = neutclipRef?.current?.hidden; //if neutclip is hidden
        setScore(score + BASE_POINTS + (hasHint ? 0 : NO_HINT_POINTS));
        playData.push({
          stage: stage,
          wasCorrect: true,
          choice: choice.label
        })
      } else {
        playData.push({
          stage: stage,
          wasCorrect: false,
          choice: choice.label,
          correctChoice: correctChoice.label
        })
        setStocks(stocks-1)
      }
      // setHint(false);
      setStage(stage+1);
    }, choiceTime); //show correct choices for x time
  };
  
  // update high score
  useEffect(() => {
    const x:number | null = Number(localStorage.getItem('HS'));
    if (stocks === 0){
      console.log(`last highscore was ${x}`)
      if (x === null || x < score){
        setHS(true);
        localStorage.setItem('HS', score.toLocaleString());
      }
      setShowChoiceResult(true);
    }
  }, [stocks, score])


  
  const currStage:StageType|null = useMemo(() => {
    if (loading && !clips){
      return null;
    }    
    if (clips.length === 0){
      getClips();
      return null;
    }
    
    
    const [clip,] = RandomChoice(clips) as [Clip|null, number];
    console.log(clip?.clipSrc)
    console.log(clips.length)
    setClips((clips) => {
      return clips.filter((filteredClip) => {
        return filteredClip !== clip;
      })
    })
    const incorrectChoices:Choice[] = [];
  
    // populate random incorrect choices
    const randomPlayers:string[] = shuffleArray(Object.keys(Player));
    for (const player of randomPlayers){
      // player doesn't have any characters or if the player has characters
      if (player !== clip?.player.label && 
        player !== Player['TEST'].label && 
        // if player's character's include the clip's character
        (Player[player].characters?.includes(clip?.character || Character.Bowser)
        // TODO
          // or if player's CONDITIONAL character's match up with the opp char (opp char not yet implemented in clips.json)
        )){
        incorrectChoices.push(Player[player]);
        if (incorrectChoices.length >= 3)
          break;
      }
    };
    return {
      clipSrc: clip?.clipSrc || "",
      character: clip?.character || Character.Bowser,
      correctChoice: clip?.player || Player.TEST,
      incorrectChoices: incorrectChoices
    }
  }, [score, stocks, loading, Clips])

  const reset = () => {
    playData = [];
    
    setClips(Clips);
    // clips = [];
    setStage(0);
    setScore(0);
    setStocks(3);
    setShowChoiceResult(false);
    // setHS(false);
  }

  const hands:ReactNode[] = useMemo(() => {
    const _hands = [];
    for (let i = 0; i < stocks; i++){
      _hands.push(<img className="hand" alt="hand" key={`hand${i}`} src={'/hand.png'} />)
    }
    return _hands;
  }, [stocks])

  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-5" style={{height: "100%"}}>
				<div className="row justify-content-center w-100">
          
          { !stop && !showChoiceResult &&
          <>
            <div className="col-6 white-text align-items-center" style={{height: "auto", textAlign: "center"}}> 
              {hands.map((hand) => {
                return hand;
              })}
              <div className="d-flex justify-content-center align-items-end mt-2 mb-3">
                <MeleeFont number={score} /><img className="melee-percent" src="numbers/percent.png" alt="%" />
                </div>
              {/* <h1>{`${score}%`}</h1> */}
            </div> 
            <div className="col-6 white-text align-items-center" style={{height: "auto", textAlign: "center"}}>
              <div className="">
              <MDBBtn onClick={stageRef.current?.tHint} className="hint" color="info">Hint?</MDBBtn>
              <MDBBtnGroup>
                <MDBCheckbox onClick={stageRef.current?.tMute} name='btnCheck' btn id='btn-check' wrapperTag='span' label='Mute' defaultChecked={!!localStorage.getItem('isMuted')} />
              </MDBBtnGroup>
              </div>
            </div> 
            <Stage ref={stageRef} stage={currStage} handleChoice={handleChoice} stageIndex={stage} />
            {/* <MDBBtn className="mt-2 w-50" color="danger" onClick={() => setShowChoiceResult(true)}>View Results</MDBBtn> */}
          </>
          }
          {/* { !stop && showChoiceResult &&
            <div className="d-flex choice-data">
              <div className="w-100">

                  <ChoiceData choiceData={mockChoiceData} correctChoice={currStage.correctChoice} />
                <div className="row w-100">
                  <MDBBtn onClick={nextStage}>Next</MDBBtn>
                  <MDBBtn className="mt-2" color="danger" onClick={() => setStop(true)}>Stop</MDBBtn>
                </div>
              </div>
            </div>
          } */}
          { (stop || showChoiceResult) && 
            <>
              <Result HS={HS} score={score} playData={playData} reset={reset} />   
            </>
          }
				</div>
			</div>
    </>
  );
};