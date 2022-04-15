import { MDBBtn } from "mdb-react-ui-kit"
import { Link } from "react-router-dom"

export const Home: React.FC = () => {
  return (
    <>
			<div className="d-flex justify-content-center align-items-center m-5" style={{height: "85vh"}}>
				<div className="row justify-content-center">
				<h1 className="white-text" style={{textAlign: "center"}}>MeleeGuessr</h1>
				<Link className="w-100" to="/play">
					<MDBBtn className="w-100" style={{height: '50px'}} color="light" size="lg">Play</MDBBtn>
				</Link>
				</div>
			</div>
    </>
  )
}