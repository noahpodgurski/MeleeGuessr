import { MDBBtn } from "mdb-react-ui-kit";
import { forwardRef, useContext } from "react";
import { Ref, useImperativeHandle } from "react";
import { useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { randomColor } from "../consts/Colors";
import { Player } from "../consts/Player";
import { ILoading, LoadingContext } from "../hooks/UseLoading";
import { Choice } from "../models/Choice";
import { shuffleArray } from "../utils/Shuffle";
import { Choices } from "./Choices";
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
  clipRef: Ref<HTMLVideoElement>;
  neutclipRef: Ref<HTMLVideoElement>;
}

export interface RefObject {
  Test: (choice:Choice) => void;
}

// export const Stage: React.FC<StageProps> = ({stage, handleChoice, stageIndex}) => {
export const Stage = forwardRef((props: StageProps, ref: Ref<RefObject>) => {
  const { stage, handleChoice, stageIndex, viewClipsOnly=false, clipRef, neutclipRef } = props;
  
  const { loading, } = useContext<ILoading>(LoadingContext);
  const [val, setVal] = useState(0);

  console.log(stage)
  // console.log('stage')

  useEffect(() => {
    setVal(val+1);
  }, [loading])

  // const requestMetadata = async () => {
  //   const res = await fetch(`${stage.clipSrc}/data`);
  //   const data = await res.json();
  //   // setVideoData(data);
  // }

  useImperativeHandle(ref, () => ({ Test }));
  const Test = async (choice:Choice) => { 
    // setShowAnswers(true);

    // setTimeout(() => {
    //   setShowAnswers(false);
    // }, 2000);
  }

  // useEffect(() => {
  //   requestMetadata().then(() => {
  //     setLoading(false);
  //   });
  // }, [stageIndex]);
  // console.log(stage)
  
  const intHandleChoice = (choice:Choice, correctChoice:Choice) => {
     if (choice.label === correctChoice.label){
      toast.success("Correct")
    }
    else {
      toast.error(`Incorrect. Answer was ${correctChoice.label}`)
    }
    // setShowAnswers(true);
    handleChoice(choice, correctChoice);
  }

  if (!stage){
    return (
      <>
        <div className="row justify-content-center p-0">
          <div className="loader"></div>
        </div>
      </>
    )
  }


  console.log(localStorage.getItem('mute'))
  console.log(!!localStorage.getItem('mute'))


  const VideoClip: React.FC = ({}) => {
    return ( 
      <>
        <video ref={clipRef} key={stage.clipSrc} className={`clip`} hidden autoPlay muted={!!localStorage.getItem('mute')} loop playsInline>
          <source src={`http://localhost:4000/video/${stage.clipSrc}`} type="video/mp4" />
        </video>
        <video ref={neutclipRef} key={`neut${stage.clipSrc}`} className={`clip`} autoPlay loop muted playsInline>
          <source src={`http://localhost:4000/video/neut${stage.clipSrc}`} type="video/mp4" />
        </video>
      </>
    )
  }
  

  return (
    <>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {}
        }}
      />

      <div className="row justify-content-center p-0">
        { loading ? <div className="loader"></div> : <VideoClip /> }
      </div>
      <div className="row justify-content-center mt-4" style={{textAlign: 'center'}}>
        {/* { !loading && <h2 className="white-text">{JSON.stringify(videoData)}</h2> } */}
        { !loading && <h2 className="white-text">Who is the {stage.character}?</h2> }
      </div>
      { viewClipsOnly ? <MDBBtn onClick={() => handleChoice(Player.TEST, stage.correctChoice)} color="success">Next</MDBBtn>
      : <>
        <Choices stage={stage} loading={loading} stageIndex={stageIndex} intHandleChoice={intHandleChoice} />
      </> }
    </>
  )
});