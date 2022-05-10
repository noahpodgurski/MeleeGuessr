import { MDBBtn, MDBBtnGroup, MDBCheckbox } from "mdb-react-ui-kit";
import { ReactNode, useContext, useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { STARTING_STOCKS } from "../App";
import { MeleeFont } from "../components/MeleeFont";
import { RefObject, Stage, StageType } from "../components/Stage";
import { Player } from "../consts/Player";
import { choiceTime } from "../consts/Time";
import { ClipsContext, IClips } from "../hooks/Clips";
import { StocksContext } from "../hooks/UseStocks";
import { IUser, UserContext } from "../hooks/UseUser";
import { Character } from "../models/Character";
import { Choice } from "../models/Choice";
import { Clip } from "../models/Clip";
import UserService from "../services/user.service";
import { RandomChoice } from "../utils/RandomChoice";
import { shuffleArray } from "../utils/Shuffle";
import { Result } from "./Result";

export type PlayData = {
  stage: number;
  wasCorrect: boolean;
  choice: string;
  correctChoice?: string;
}

let playData:PlayData[] = [];
let clips:Clip[] = [];

const BASE_POINTS = 1;
const NO_HINT_POINTS = 2;

export const Play: React.FC = () => {
  // ex: stage 1/5
  const [stage, setStage] = useState(0);
  const [score, setScore] = useState(0);
  const { stocks, setStocks } = useContext<any>(StocksContext);
  const { Clips, getClips } = useContext<IClips>(ClipsContext);
  const [showChoiceResult, setShowChoiceResult] = useState(false);
  const [HS, setHS] = useState(false);
  const [currStage, setCurrStage] = useState<StageType|null>(null);
  const { user } = useContext<IUser>(UserContext);

  const stageRef = useRef<RefObject>(null);
  const hintButtonRef = useRef<any>(null);
  const reportButtonRef = useRef<any>(null);
  
  useEffect( () => {
    if (clips.length === 0){
      const fetchData = async () => {
        await getClips();
      }
      fetchData();
    }
    // eslint-disable-next-line
  }, [stocks])
  // }, [loading])


  const schliceClip = () => {
    // console.log(clips.length)
    if (clips.length !== 0){
      const [clip, slicedIndex] = RandomChoice(clips) as [Clip, number];
      clips.splice(slicedIndex, 1);
      updateStage(clip);
    }
  }

  useEffect(() => {
    if (stocks === STARTING_STOCKS){

      const _clips = Clips.filter((clip:Clip) => { return clip?.player.label !== "TEST" });
      // setClips(_clips);
      clips = _clips;
      schliceClip();
    }
    // eslint-disable-next-line
  }, [Clips, stocks])

  useEffect(() => {
    schliceClip();
    // eslint-disable-next-line
  }, [stage, score, stocks, playData.length])

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
      
      // update stat
      if (user?.id){
        UserService.updateStats({
          userId: user.id, //string
          username: user.username,
          wasCorrect: choice.label === correctChoice.label, //bool
          //      is correct                              if so add the amt of points we'd add (above) or send current score
          score: (choice.label === correctChoice.label) ? score + BASE_POINTS + (hasHint ? 0 : NO_HINT_POINTS) : score, //num
          final: choice.label !== correctChoice.label && stocks === 1 //bool
        })
      }

      // setHint(false);
      hintButtonRef.current?.removeAttribute("disabled");
      reportButtonRef.current?.removeAttribute("disabled");
      setStage(stage+1);
    }, choiceTime); //show correct choices for x time
  };
  
  // update high score
  useEffect(() => {
    const x:number | null = Number(localStorage.getItem('HS'));
    if (stocks === 0){
      // console.log(`last highscore was ${x}`)
      if (x === null || x < score){
        setHS(true);
        localStorage.setItem('HS', score.toLocaleString());
      }
      setShowChoiceResult(true);
    }
  }, [stocks, score])


  
  const updateStage = (clip:Clip) => {
    const incorrectChoices:Choice[] = [];
  
    // populate random incorrect choices
    const randomPlayers:string[] = shuffleArray(Object.keys(Player));
    for (const player of randomPlayers){
      const characters = Player[player].characters || [];
      const conditionalCharacters = Player[player].conditionalCharacters || {};
      // todo - make clip.character REQUIRED
      const clipChar = clip?.character || Character.Bowser;
      const oppChar = clip?.oppChar || Character.Bowser;
      // const oppPlayer = clip?.oppPlayer || Character.Bowser;

      const _ = conditionalCharacters[clipChar] || [];

      // player is not correct answer
      if (player !== clip?.player.label && 
        // not TEST
        player !== Player['TEST'].label && 
        // if player's character's include the clip's character
        (characters.includes(clipChar) ||
        // or if player's CONDITIONAL character's match up with the opp char (opp char not yet implemented in clips.json)
        (_.includes(oppChar)))
        ){
        incorrectChoices.push(Player[player]);
        
      
        if (incorrectChoices.length >= 3)
          break;
      }
    };
    setCurrStage({
      clipSrc: clip?.clipSrc || "",
      character: clip?.character || "",
      correctChoice: clip?.player || Player.TEST,
      incorrectChoices: incorrectChoices
    })
  }

  const reportClip = () => {
    reportButtonRef.current?.setAttribute("disabled", true);
    UserService.reportClip(currStage?.clipSrc)
    .then((data:any) => {
      if (data.status === "success"){
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    })
    .catch((err:any) => {
      toast.error(err.response.data.message);
    });
  }

  const reset = () => {
    playData = [];
    clips = [];
    
    setStage(0);
    setScore(0);
    setStocks(STARTING_STOCKS);
    setShowChoiceResult(false);
    setHS(false);
  }

  const hands:ReactNode[] = useMemo(() => {
    const _hands = [];
    for (let i = 0; i < stocks; i++){
      _hands.push(<img className="hand" alt="hand" key={`hand${i}`} src={'/logo.png'} />)
    }
    return _hands;
  }, [stocks])

  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-5" style={{height: "100%"}}>
				<div className="row justify-content-center w-100">
          
          { !showChoiceResult ?
          <>
            <div className="d-flex justify-content-between" style={{maxWidth: "1200px"}}>
              <div className="white-text align-items-center" style={{height: "auto", textAlign: "center"}}> 
                {hands.map((hand) => {
                  return hand;
                })}
                <div className="d-flex justify-content-center align-items-end mt-2 mb-3">
                  <MeleeFont number={score} /><img className="melee-percent" src="numbers/percent.png" alt="%" />
                </div>
              </div>
              <div className="white-text align-items-center" style={{height: "auto", textAlign: "center"}}>
                <MDBBtn ref={hintButtonRef} onClick={() => {
                  stageRef.current?.tHint(); 
                  hintButtonRef.current?.setAttribute("disabled", true); 
                  }
                } className="hint" color="info">Hint?
                </MDBBtn>
              </div> 
              <div className="white-text align-items-center" style={{height: "auto", textAlign: "center"}}>
                <MDBBtn ref={reportButtonRef} onClick={reportClip} className="hint" color="warning">Report
                </MDBBtn>
              </div> 
              <div className="white-text align-items-center" style={{height: "auto", textAlign: "center"}}>
                <MDBBtnGroup>
                  <MDBCheckbox btnColor="danger" onClick={stageRef.current?.tMute} name='btnCheck' btn id='btn-check' wrapperTag='span' label='Mute' defaultChecked={!!localStorage.getItem('isMuted')} />
                </MDBBtnGroup>
              </div>
            </div> 
            <Stage ref={stageRef} stage={currStage} handleChoice={handleChoice} stageIndex={stage} />
            {/* <MDBBtn className="mt-2 w-50" color="danger" onClick={() => setShowChoiceResult(true)}>View Results</MDBBtn> */}
          </> : <Result HS={HS} score={score} playData={playData} reset={reset} />
          }
				</div>
			</div>
    </>
  );
};