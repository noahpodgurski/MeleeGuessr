import { MDBBtn } from "mdb-react-ui-kit"
import { useContext } from "react";
import { Link } from "react-router-dom"
import { STARTING_STOCKS } from "../App";
import { StocksContext } from "../hooks/UseStocks";

export const Home: React.FC = () => {
  const { setStocks } = useContext<any>(StocksContext);	
  return (
    <>
			<div className="full-page d-flex justify-content-center align-items-center m-5">
				<div className="row justify-content-center">
				<h1 className="white-text" style={{textAlign: "center"}}>MeleeGuessr</h1>
				<Link className="w-100" to="/play">
					<MDBBtn onClick={() => setStocks(STARTING_STOCKS)} className="w-100" style={{height: '50px'}} color="light" size="lg">Play</MDBBtn>
				</Link>
				</div>
			</div>			
    </>
  )
}