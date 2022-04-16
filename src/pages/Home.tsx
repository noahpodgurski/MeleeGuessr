import { MDBBtn } from "mdb-react-ui-kit"
import { useContext } from "react";
import { Link } from "react-router-dom"
import { LivesContext } from "../hooks/UseLives";

export const Home: React.FC = () => {
  const { setLives } = useContext<any>(LivesContext);
  return (
    <>
			<div className="d-flex justify-content-center align-items-center m-5" style={{height: "85vh"}}>
				<div className="row justify-content-center">
				<h1 className="white-text" style={{textAlign: "center"}}>MeleeGuessr</h1>
				<Link className="w-100" to="/play">
					<MDBBtn onClick={() => setLives(3)} className="w-100" style={{height: '50px'}} color="light" size="lg">Play</MDBBtn>
				</Link>
				</div>
			</div>
    </>
  )
}