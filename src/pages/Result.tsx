import { MDBBtn } from "mdb-react-ui-kit";
import { PlayData } from "./Play";

interface ResultProps {
  HS: boolean;
  score: number;
  playData: PlayData[];
  reset: () => void;
}

export const Result: React.FC<ResultProps> = ({ HS, score, playData, reset }) => {
  return (
    <>
      <div className="full-page d-flex justify-content-center align-items-center">
				<div className="row justify-content-center" style={{textAlign: 'center'}}>
			    {/* <div className="row" style={{textAlign: "center"}}> */}
          { HS && <h1>High Score!</h1> }
          <h2 className="white-text">Final: {score}%</h2>
            <MDBBtn size="lg" color="success" onClick={reset}>Retry?</MDBBtn>
            {/* <MDBBtn className="mt-2" color="danger" onClick={() => setStop(true)}>Stop</MDBBtn> */}
          {/* </div> */}
				</div>
			</div>
      {/* { playData.map((data, i) => {
        return (
          <div key={i} className="row w-100 secondary-text" style={{textAlign: "center"}}>
            <h3>#{i+1}. {data.wasCorrect ? "Correct" : "Incorrect"}, You chose {data.choice}</h3>
          </div> 
        )
      }) } */}
    </>
  )
}