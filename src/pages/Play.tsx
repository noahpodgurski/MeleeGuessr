import { MDBBtn } from "mdb-react-ui-kit";
import { useContext, useEffect, useMemo } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Stage, StageType } from "../components/Stage";
// import { Clips } from "../hooks/Clips";
import { Player } from "../consts/Player";
import { ClipsContext } from "../hooks/Clips";
import { LivesContext } from "../hooks/UseLives";
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


const noMore: StageType = 
{
  clipSrc: "./clips/testClip.mp4",
  character: "Peach",
  correctChoice: Player.Armada,
  incorrectChoices: [Player.Llod, Player.Polish, Player.Mew2King]
};

export const Play: React.FC = () => {
  // ex: stage 1/5
  const [stage, setStage] = useState(0);
  const [score, setScore] = useState(0);
  const { lives, setLives } = useContext<any>(LivesContext);
  const { Clips, getClips } = useContext<any>(ClipsContext);
  const [clips, setClips] = useState<Clip[]>([])
  const [showChoiceResult, setShowChoiceResult] = useState(false);
  const [HS, setHS] = useState(false);
  const [stop,] = useState(false);  
  
  
  useEffect( () => {
    const fetchData = async () => {
      await getClips();
    }
    // if (!Clips)
      // getClips();
    fetchData();
  }, [useEffect])

  useEffect(() => {
    setClips(Clips);
  }, [Clips])

  // useEffect(() => {
  //   while (playData.length > 0)
  //     playData.pop();
  // }, [])

  const handleChoice = (choice:Choice, correctChoice:Choice) => {
    if (choice.label === correctChoice.label){
      setScore(score+1);
      playData.push({
        stage: stage,
        wasCorrect: true,
        choice: choice.label
      })
      toast.success("Correct")
    } else {
      playData.push({
        stage: stage,
        wasCorrect: false,
        choice: choice.label,
        correctChoice: correctChoice.label
      })
      toast.error(`Incorrect. Answer was ${correctChoice.label}`)
      setLives(lives-1)
    }
    setStage(stage+1);
  };
  
  useEffect(() => {
    const x:number | null = Number(localStorage.getItem('HS'));
    if (lives === 0){
      console.log(`last highscore was ${x}`)
      if (x === null || x < score){
        setHS(true);
        localStorage.setItem('HS', score.toLocaleString());
        console.log('here')
      }
      setShowChoiceResult(true);
    }
  }, [lives])


  
  const currStage:StageType = useMemo(() => {
    if (clips.length === 0){
      getClips();
      return noMore;
    }

    const [clip, slicedIndex] = RandomChoice(clips);
    setClips((clips) => {
      return clips.splice(slicedIndex, 1);
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
      incorrectChoices: incorrectChoices
    }
  }, [playData.length, getClips])

  const reset = () => {
    playData = [];
    
    setClips(Clips);
    // clips = [];
    setStage(0);
    setScore(0);
    setLives(3);
    setShowChoiceResult(false);
    setHS(false);
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-5" style={{height: "100%"}}>
				<div className="row justify-content-center w-100">
          
          { !stop && !showChoiceResult &&
          <>
            <div className="white-text align-items-center" style={{height: "auto", textAlign: "center"}}>
              <h1>{playData.length > 0 && score > 0 && `Score ${score}`}</h1>
            </div> 
            <Stage stage={currStage} handleChoice={handleChoice} stageIndex={stage} />
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