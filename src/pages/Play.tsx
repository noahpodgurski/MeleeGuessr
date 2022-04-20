import { MDBBtn, MDBBtnGroup, MDBCheckbox } from "mdb-react-ui-kit";
import { ReactNode, useContext, useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { RefObject, Stage, StageType } from "../components/Stage";
// import { Clips } from "../hooks/Clips";
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
  const { Clips, getClips } = useContext<any>(ClipsContext);
  const { loading, setLoading } = useContext<ILoading>(LoadingContext);
  const [clips, setClips] = useState<Clip[]>([])
  const [showChoiceResult, setShowChoiceResult] = useState(false);
  const [HS, setHS] = useState(false);
  const [stop,] = useState(false);
  const [mute, setMute] = useState(false);
  const [hint, setHint] = useState(false);

  const stageRef = useRef<RefObject>(null);
  const clipRef = useRef<HTMLVideoElement>(null);
  const neutclipRef = useRef<HTMLVideoElement>(null);
  
  
  useEffect( () => {
    if (!loading && !clips){

      const fetchData = async () => {
        await getClips();
      }
      fetchData();
    }
  }, [useEffect])

  useEffect(() => {
    const _clips = Clips.filter((clip:Clip) => { return clip.player.label !== "TEST" });
    // console.log(_clips)
    setClips(_clips);
  }, [Clips])

  // useEffect(() => {
  //   while (playData.length > 0)
  //     playData.pop();
  // }, [])

  const toggleMute = async () => {
    if (clipRef && clipRef.current){
      let x = clipRef.current.muted;
      console.log(`setting to ${clipRef.current.muted ? 'true' : ''}`)
      clipRef.current.muted = !clipRef.current.muted
      localStorage.setItem('mute', clipRef.current.muted ? 'true' : '')
    }
  }

  const toggleHint = () => {
    if (clipRef && clipRef.current){
      // if (clipRef.current.hidden)
        // toast.success("Player's preferred colors revealed!")
      clipRef.current.hidden = false;
    }
    if (neutclipRef && neutclipRef.current)
      neutclipRef.current.hidden = true;
  }
  
  const displayCorrectChoice = async (choice:Choice, correctChoice:Choice) => {
    if (stageRef.current){
      stageRef.current.Test(choice);
    }
  }

  const handleChoice = (choice:Choice, correctChoice:Choice) => {
    setTimeout(() => {
      if (choice.label === correctChoice.label){
        let hasHint = neutclipRef?.current?.hidden; //if neutclip is hidden
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
    }, 2000); //show correct choices for x time
  };
  
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
  }, [stocks])


  
  const currStage:StageType|null = useMemo(() => {
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
        return filteredClip !== clip;
      })
    })
    const incorrectChoices:Choice[] = [];
  
    const randomPlayers:string[] = shuffleArray(Object.keys(Player));
    for (const player of randomPlayers){
      // player doesn't have any characters or if the player has characters
      if (player !== clip.player.label && player !== Player['TEST'].label && (!Player[player].characters || Player[player].characters?.includes(clip.character))){
        incorrectChoices.push(Player[player]);
        if (incorrectChoices.length >= 3)
          break;
      }
    };
    return {
      clipSrc: clip.clipSrc,
      character: clip.character,
      correctChoice: clip.player,
      incorrectChoices: incorrectChoices
    }
  }, [getClips, stage])

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
      _hands.push(<img key={`hand${i}`} src={'/hand.png'} />)
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
              <h1>{`${score}%`}</h1>
            </div> 
            <div className="col-6 white-text align-items-center" style={{height: "auto", textAlign: "center"}}>
              <div className="">
              <MDBBtn onClick={() => toggleHint()} className="hint" color="info">Hint?</MDBBtn>
              <MDBBtnGroup>
                <MDBCheckbox onClick={toggleMute} name='btnCheck' btn id='btn-check' wrapperTag='span' label='Mute' defaultChecked={mute} />
              </MDBBtnGroup>
              </div>
            </div> 
            <Stage ref={stageRef} clipRef={clipRef} neutclipRef={neutclipRef} stage={currStage} handleChoice={handleChoice} stageIndex={stage} />
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
              <div className="white-text align-items-center" style={{height: "auto", textAlign: "center"}}>
                { HS && <h1>High Score!</h1> }
                <h2>Final Score {score}/{playData.length} Correct</h2>
              </div>
              { playData.map((data, i) => {
                return (
                  <div key={i} className="row w-100 secondary-text" style={{textAlign: "center"}}>
                    <h3>#{i+1}. {data.wasCorrect ? "Correct" : "Incorrect"}, You chose {data.choice}</h3>
                  </div> 
                )
              }) }
            </>
          }
          { !stop && showChoiceResult &&
            <div className="d-flex choice-data">
              <div className="w-25 justify-content-center" >

                  {/* <ChoiceData choiceData={mockChoiceData} correctChoice={currStage.correctChoice} /> */}
                <div className="row" style={{textAlign: "center"}}>
                  <MDBBtn size="lg" color="success" onClick={reset}>Retry?</MDBBtn>
                  {/* <MDBBtn className="mt-2" color="danger" onClick={() => setStop(true)}>Stop</MDBBtn> */}
                </div>
              </div>
            </div>
          }
				</div>
			</div>
    </>
  );
};