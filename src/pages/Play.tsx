import { useState } from "react";
import { Choice, Stage, StageType } from "../components/Stage";

type PlayData = {
  stage: number;
  wasCorrect: boolean;
  choice: string;
  // only if not correct
  correctChoice?: string;
}

export const Play: React.FC = () => {
  // ex: stage 1/5
  const [stage, setStage] = useState(0);
  // ex
  const [score, setScore] = useState(0);
  
  let playData:PlayData[] = [];
  

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
      clipSrc: "./clips/testClip.mp4",
      questionedObject: "Peach",
      correctChoice: "Armada",
      incorrectChoices: ["Llod", "Polish", "M2K"]
    },
    {
      clipSrc: "./clips/testClip.mp4",
      questionedObject: "Peach",
      correctChoice: "Armada",
      incorrectChoices: ["Llod", "Polish", "M2K"]
    },
    {
      clipSrc: "./clips/testClip.mp4",
      questionedObject: "Peach",
      correctChoice: "Armada",
      incorrectChoices: ["Llod", "Polish", "M2K"]
    },
    {
      clipSrc: "./clips/testClip.mp4",
      questionedObject: "Peach",
      correctChoice: "Armada",
      incorrectChoices: ["Llod", "Polish", "M2K"]
    }
  ];


  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-5" style={{height: "90vh"}}>
				<div className="row justify-content-center">
          { stage < mockStages.length ? 
            <Stage stage={mockStages[stage]} handleChoice={handleChoice} />
          : 
            <div>
              You got {score} correct!
            </div>
          }
				</div>
			</div>
    </>
  );
};