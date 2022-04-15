import { useState } from "react";
import { Choice, Stage, StageType } from "../components/Stage";

type PlayData = {
  stage: number;
  wasCorrect: boolean;
  choice: string;
  // only if not correct
  correctChoice?: string;
}
const playData:PlayData[] = [];

export const Play: React.FC = () => {
  // ex: stage 1/5
  const [stage, setStage] = useState(0);
  // ex
  const [score, setScore] = useState(0);
  
  

  const handleChoice = (choice:Choice, correctChoice:Choice) => {
    if (choice === correctChoice){
      setScore(score+1);
      playData.push({
        stage: stage,
        wasCorrect: true,
        choice: choice
      })
    } else {
      playData.push({
        stage: stage,
        wasCorrect: false,
        choice: choice,
        correctChoice: correctChoice
      })
    }
    setStage(stage+1);
  };

  const mockStages: StageType[] = [
    {
      clipSrc: "./clips/testClip.mp4",
      questionedObject: "Peach",
      correctChoice: "Armada",
      incorrectChoices: ["Llod", "Polish", "M2K"]
    },
    {
      clipSrc: "./clips/testClip2.mp4",
      questionedObject: "Peach",
      correctChoice: "Llod",
      incorrectChoices: ["Armada", "Polish", "M2K"]
    },
    {
      clipSrc: "./clips/testClip.mp4",
      questionedObject: "Peach",
      correctChoice: "Armada",
      incorrectChoices: ["Llod", "Polish", "M2K"]
    },
    {
      clipSrc: "./clips/testClip2.mp4",
      questionedObject: "Peach",
      correctChoice: "Llod",
      incorrectChoices: ["Armada", "Polish", "M2K"]
    },
    {
      clipSrc: "./clips/testClip.mp4",
      questionedObject: "Peach",
      correctChoice: "Armada",
      incorrectChoices: ["Llod", "Polish", "M2K"]
    }
  ];

  console.log(playData);


  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-5" style={{height: "100%"}}>
				<div className="row justify-content-center">
          { stage < mockStages.length ? 
            <Stage stage={mockStages[stage]} handleChoice={handleChoice} stageIndex={stage} />
          : 
            <div className="white-text align-items-center" style={{height: "auto", textAlign: "center"}}>
              <h2>Final Score {score}/{mockStages.length} Correct</h2>
            </div> }
            { stage >= mockStages.length && playData.map((data, i) => {
              return (
                <div key={i} className="row w-100 secondary-text" style={{textAlign: "center"}}>
                  <h3>#{i+1}. {data.wasCorrect ? "Correct" : "Incorrect"}, You chose {data.choice}</h3>
                </div> 
              )
            })
          }
				</div>
			</div>
    </>
  );
};