import { MDBBtn } from "mdb-react-ui-kit";
import { useContext, useEffect } from "react";
import { forwardRef, useRef } from "react";
import { Ref, useImperativeHandle } from "react";
import toast from "react-hot-toast";
import { Player } from "../consts/Player";
import { ILoading, LoadingContext } from "../hooks/UseLoader";
import { IUser, UserContext } from "../hooks/UseUser";
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
const BUFFERED_RATIO_MIN = 0.15;

var hint = false;

// export const Stage: React.FC<StageProps> = ({stage, handleChoice, stageIndex}) => {
export const Stage = forwardRef((props: StageProps, ref: Ref<RefObject>) => {
  const { stage, handleChoice, stageIndex, viewClipsOnly=false } = props;
  const clipRef = useRef<HTMLVideoElement>(null);
  const neutclipRef = useRef<HTMLVideoElement>(null);
  const { user } = useContext<IUser>(UserContext);
  const { setLoading } = useContext<ILoading>(LoadingContext);
  
  const inactiveRef = useRef<HTMLDivElement>(null);
  const isFocused = useRef<boolean>(true);

  const setFocused = () => {
    isFocused.current = true;
    setLoading(false);
  }
  
  const setUnfocused = () => {
    isFocused.current = false;
  }

  useEffect(() => {
    window.addEventListener('focus', setFocused);
    window.addEventListener('blur', setUnfocused);

    return () => {
      window.removeEventListener('focus', setFocused);
      window.removeEventListener('blur', setUnfocused);
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    clipRef.current?.pause()
    neutclipRef.current?.pause()
    setLoading(true);
    const interval = setInterval(() => {
    if (clipRef.current?.paused || neutclipRef.current?.paused){
        inactiveRef.current?.classList.remove('hidden');
      }
    }, 5000)
    return () => {clearInterval(interval)}
    // eslint-disable-next-line
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
  }, [stage, clipRef, user])

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
    hint = neutclipRef.current?.hidden || false;
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

  const DIFF_BUFF = 0.1;
  const timeout = (delay: number) => {
    return new Promise( res => setTimeout(res, delay*1000) );
  }
  
  useEffect(() => {
    const timingInterval = setInterval(async () => {
      if (clipRef.current && neutclipRef.current){
        // console.log(clipRef.current.currentTime-neutclipRef.current.currentTime);
        let diff = Math.abs(clipRef.current.currentTime-neutclipRef.current.currentTime);
        if (diff > DIFF_BUFF){
          if (clipRef.current.currentTime > neutclipRef.current.currentTime){
            if (clipRef.current.hidden && !clipRef.current.paused && diff < 5){ //only if hidden
              // console.log(`clip is ahead, pausing for ${diff}`)
              setLoading(true);
              clipRef.current.pause()
              await timeout(diff);
              // console.log('resume')
              setLoading(false);
              clipRef.current.play()
            }
          }
          else {
            if (!neutclipRef.current.paused && diff < 5) {
              if (clipRef.current.hidden){
                // console.log(`neut clip is ahead, pausing for ${diff}`)
                setLoading(true);
                neutclipRef.current.pause()
                await timeout(diff);
                // console.log('resume')
                setLoading(false);
                neutclipRef.current.play()
              }
            }
          }
        }
      }
    }, 100)

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
              if (isFocused.current){
                clipRef.current.play()
                neutclipRef.current.play()
                setLoading(false);
              }
            }
          }
        } catch(err) {
          // console.log(err)
        }
      }
    }, 1000)

    return () => {
      clearInterval(timingInterval);
      clearInterval(interval);
    }
    // eslint-disable-next-line
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

  const VideoClip: React.FC = () => {
    return ( 
      <>
        <video ref={neutclipRef} key={`neut${stage.clipSrc}`} preload="auto" className={`clip`} loop muted playsInline autoPlay>
          <source src={`https://meleeguessr-clips.s3.amazonaws.com/neut${stage.clipSrc}.mp4`} type="video/mp4" />
        </video>
        <video ref={clipRef} key={stage.clipSrc} className={`clip`} preload="auto" hidden loop playsInline autoPlay>
        {/* <video ref={clipRef} key={stage.clipSrc} className={`clip`} hidden loop playsInline> */}
          <source src={`https://meleeguessr-clips.s3.amazonaws.com/${stage.clipSrc}.mp4`} type="video/mp4" />
        </video>
      </>
    )
  }

  return (
    <>
      {/* <div ref={inactiveRef} className="inactive-warning hidden red-text d-flex justify-content-center align-items-center" style={{textAlign: 'center'}}>
        <h1>Click to resume</h1>
      </div> */}
      <div className="row justify-content-center p-0 socket loader">
        <VideoClip />
      </div>
      <div className="row justify-content-center mt-4" style={{textAlign: 'center'}}>
        { <h2 className="white-text">Who is the {stage.character}?</h2> }
      </div>
      { viewClipsOnly ? <MDBBtn onClick={() => handleChoice(Player.TEST, stage.correctChoice)} color="success">Next</MDBBtn>
      : <>
        <Choices stage={stage} stageIndex={stageIndex} intHandleChoice={intHandleChoice} />
      </> }
    </>
  )
});