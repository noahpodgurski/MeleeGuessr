import { Component } from 'solid-js';
import { PlayData } from "./Play";

interface ResultProps {
  HS: boolean;
  score: number;
  playData: PlayData[];
  reset: () => void;
}

export const Result: Component<ResultProps> = ({ HS, score, playData, reset }) => {
  return (
    <>
      <div class="full-page d-flex justify-content-center align-items-center">
				<div class="row justify-content-center" style={{"text-align": 'center'}}>
			    {/* <div class="row" style={{"text-align": "center"}}> */}
          { HS && <h1>High Score!</h1> }
          <h2 class="white-text">Final: {score}%</h2>
            <button class="btn btn-success btn-lag" onClick={reset}>Retry?</button>
            {/* <MDBBtn class="mt-2" color="danger" onClick={() => setStop(true)}>Stop</MDBBtn> */}
          {/* </div> */}
				</div>
			</div>
      {/* { playData.map((data, i) => {
        return (
          <div class="row w-100 secondary-text" style={{"text-align": "center"}}>
            <h3>#{i+1}. {data.wasCorrect ? "Correct" : "Incorrect"}, You chose {data.choice}</h3>
          </div> 
        )
      }) } */}
    </>
  )
}