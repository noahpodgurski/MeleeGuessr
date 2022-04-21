import { MDBBtn } from "mdb-react-ui-kit";
import { useEffect } from "react";
import { forwardRef, useContext, useRef } from "react";
import { Ref, useImperativeHandle } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Player } from "../consts/Player";
import { choiceTime } from "../consts/Time";
import { ILoading, LoadingContext } from "../hooks/UseLoading";
import { Choice } from "../models/Choice";
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
}

export interface RefObject {
  tMute: () => void;
  tHint: () => void;
  hasHint: () => boolean | undefined;
}

const VOLUME_MIN = 0.0001;

var hint = false;

// export const Stage: React.FC<StageProps> = ({stage, handleChoice, stageIndex}) => {
export const Stage = forwardRef((props: StageProps, ref: Ref<RefObject>) => {
  const { stage, handleChoice, stageIndex, viewClipsOnly=false } = props;
  const clipRef = useRef<HTMLVideoElement>(null);
  const neutclipRef = useRef<HTMLVideoElement>(null);
  
  const { loading, } = useContext<ILoading>(LoadingContext);

  useEffect(() => {
    console.log('useEffect')
    console.log('isMuted')
    console.log(!!localStorage.getItem('isMuted'))

    if (clipRef.current){
      if (clipRef.current.volume === VOLUME_MIN && !!localStorage.getItem('isMuted')){ //IS MUTED
        clipRef.current.volume = VOLUME_MIN;
      }
      else if (clipRef.current.volume === 1 && !localStorage.getItem('isMuted')) {
        clipRef.current.volume = 1; //is not muted
      }
      else {
        console.log('desync IN USEEFFECT')
        if (!!localStorage.getItem('isMuted')){
          clipRef.current.volume = VOLUME_MIN;
        } else {
          clipRef.current.volume = 1;
        }
      }
      


      // if (!!localStorage.getItem('isMuted'))
      // clipRef.current.volume = VOLUME_MIN;
      // else
      // clipRef.current.volume = 1;
    }
  }, [stage, clipRef])

  // const requestMetadata = async () => {
  //   const res = await fetch(`${stage.clipSrc}/data`);
  //   const data = await res.json();
  //   // setVideoData(data);
  // }

  useImperativeHandle(ref, () => ({ tMute, tHint, hasHint }));
  const tMute = () => {
    toggleMute();
  }
  const tHint = () => { 
    toggleHint();
  }
  const hasHint = () => { 
    return hint; //if neutclip is hidden
  }

  // useEffect(() => {
  //   requestMetadata().then(() => {
  //     setLoading(false);
  //   });
  // }, [stageIndex]);

  
  const toggleMute = () => {
    if (clipRef && clipRef.current){
      if (clipRef.current.volume === VOLUME_MIN && !!localStorage.getItem('isMuted')){ //IS MUTED
        console.log('setting unmuted')
        clipRef.current.volume = 1;
        localStorage.setItem('isMuted', '')  //set not muted
      }
      else if (clipRef.current.volume === 1 && !localStorage.getItem('isMuted')) {
        console.log('setting muted')
        clipRef.current.volume = VOLUME_MIN; //is not muted
        localStorage.setItem('isMuted', 'true') //set muted
      }
      else {
        console.log('desync')
        if (!!localStorage.getItem('isMuted')){
          clipRef.current.volume = 1;
          localStorage.setItem('isMuted', '');
        } else {
          clipRef.current.volume = VOLUME_MIN;
          localStorage.setItem('isMuted', 'true');
        }
      }
        
      // console.log(`setting to ${clipRef.current.muted ? 'true' : ''}`)
      // clipRef.current.muted = !clipRef.current.muted
      // localStorage.setItem('mute', clipRef.current.muted ? 'true' : '') 
    }
  }

  const toggleHint = (showToast:boolean=true) => {
    if (clipRef && clipRef.current){
      // if (clipRef.current.hidden)
      if (showToast)
        toast.success("Player's preferred colors revealed!")
      clipRef.current.hidden = false;
    }
    if (neutclipRef && neutclipRef.current)
      neutclipRef.current.hidden = true;
  }
  
  const intHandleChoice = (choice:Choice, correctChoice:Choice) => {
    hint = neutclipRef?.current?.hidden || false;
    if (toggleHint)
      toggleHint(false);
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


  // console.log(localStorage.getItem('mute'))
  // console.log(!!localStorage.getItem('mute'))


  const VideoClip: React.FC = ({}) => {
    return ( 
      <>
        <video ref={neutclipRef} key={`neut${stage.clipSrc}`} className={`clip`} autoPlay loop muted playsInline>
          <source src={`http://localhost:4000/video/neut${stage.clipSrc}`} type="video/mp4" />
        </video>
        <video ref={clipRef} key={stage.clipSrc} className={`clip`} hidden autoPlay loop playsInline>
        {/* <video ref={clipRef} key={stage.clipSrc} className={`clip`} hidden autoPlay loop playsInline> */}
          <source src={`http://localhost:4000/video/${stage.clipSrc}`} type="video/mp4" />
        </video>
      </>
    )
  }
  

  return (
    <>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: choiceTime,
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