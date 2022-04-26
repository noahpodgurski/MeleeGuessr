import { MDBBtn } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { forwardRef, useRef } from "react";
import { Ref, useImperativeHandle } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Player } from "../consts/Player";
import { choiceTime } from "../consts/Time";
import { Choice } from "../models/Choice";
import { Choices } from "./Choices";
import { Loader } from "./Loader";
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
const BUFFERED_RATIO_MIN = 0.15;

var hint = false;

// export const Stage: React.FC<StageProps> = ({stage, handleChoice, stageIndex}) => {
export const Stage = forwardRef((props: StageProps, ref: Ref<RefObject>) => {
  const { stage, handleChoice, stageIndex, viewClipsOnly=false } = props;
  const clipRef = useRef<HTMLVideoElement>(null);
  const neutclipRef = useRef<HTMLVideoElement>(null);
  
  const loaderRef = useRef<HTMLDivElement>(null);
  // const { loading, } = useContext<ILoading>(LoadingContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // if (!loading){
      loaderRef.current?.classList.remove('hidden');
      // setLoading(true);
    // }
  }, [stage])

  useEffect(() => {
    if (clipRef.current){
        // console.log('desync IN USEEFFECT')
        if (!!localStorage.getItem('isMuted')){
          clipRef.current.volume = VOLUME_MIN;
        } else {
          clipRef.current.volume = 1;
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
        // console.log('setting unmuted')
        clipRef.current.volume = 1;
        localStorage.setItem('isMuted', '')  //set not muted
      }
      else if (clipRef.current.volume === 1 && !localStorage.getItem('isMuted')) {
        // console.log('setting muted')
        clipRef.current.volume = VOLUME_MIN; //is not muted
        localStorage.setItem('isMuted', 'true') //set muted
      }
      else {
        // console.log('desync')
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

  
  useEffect(() => {
    const interval = setInterval(() => {
      if (clipRef.current && neutclipRef.current){
        try {
          var buffered = clipRef.current.buffered;
          var neutbuffered = neutclipRef.current.buffered;
          if (buffered && neutbuffered){
            
            // console.log(
            //   'clip buffered: ' + buffered.start(0) + ' - ' + buffered.end(0) + ' sec'
            // );
            // console.log(
            //   'neutclip buffered: ' + neutbuffered.start(0) + ' - ' + neutbuffered.end(0) + ' sec'
            // );
            
            if (buffered.end(0) / clipRef.current.duration > BUFFERED_RATIO_MIN && neutbuffered.end(0) / neutclipRef.current.duration > BUFFERED_RATIO_MIN){
              clipRef.current.play()
              neutclipRef.current.play()
              loaderRef.current?.classList.add('hidden');
            }
          }
        } catch(err) {
          // console.log(err)
        }
      }
    }, 1000)

    return () => {
      clearInterval(interval);
    }
  }, [useEffect])

  if (!stage){
    return (
      <>
        <div className="row justify-content-center p-0">
          <div className="loader"></div>
        </div>
      </>
    )
  }

  const VideoClip: React.FC = ({}) => {
    return ( 
      <>
        <video ref={neutclipRef} key={`neut${stage.clipSrc}`} preload="auto" className={`clip`} loop muted playsInline>
          <source src={`/videos/neut${stage.clipSrc}.mp4`} type="video/mp4" />
        </video>
        <video ref={clipRef} key={stage.clipSrc} className={`clip`} preload="auto" hidden loop playsInline>
        {/* <video ref={clipRef} key={stage.clipSrc} className={`clip`} hidden loop playsInline> */}
          <source src={`/videos/${stage.clipSrc}.mp4`} type="video/mp4" />
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

      <div className="row justify-content-center p-0 socket loader">
        {/* <div className="socket loader"> */}
            <Loader ref={loaderRef} />
          {/* } */}
        <VideoClip />
      </div>
      <div className="row justify-content-center mt-4" style={{textAlign: 'center'}}>
        {/* { !loading && <h2 className="white-text">{JSON.stringify(videoData)}</h2> } */}
        { <h2 className="white-text">Who is the {stage.character}?</h2> }
      </div>
      { viewClipsOnly ? <MDBBtn onClick={() => handleChoice(Player.TEST, stage.correctChoice)} color="success">Next</MDBBtn>
      : <>
        <Choices stage={stage} loading={loading} stageIndex={stageIndex} intHandleChoice={intHandleChoice} />
      </> }
    </>
  )
});