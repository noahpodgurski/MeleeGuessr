import { MDBBtn } from "mdb-react-ui-kit"
import { useContext, useMemo } from "react";
import { Link } from "react-router-dom"
import { STARTING_STOCKS } from "../App";
import { randomGreeting } from "../consts/Greetings";
import { StocksContext } from "../hooks/UseStocks";

export const Home: React.FC = () => {
  const { setStocks } = useContext<any>(StocksContext);	
	const greeting = useMemo(() => {
		return randomGreeting();
	}, [])
  return (
    <>
			<div className="full-page d-flex justify-content-center align-items-center m-2">
				<div className="row justify-content-center">
				<h1 className="logo" style={{textAlign: "center", fontSize: "rem"}}>MeleeGuessr</h1>
				<Link className="w-100" to="/play">
					<MDBBtn onClick={() => setStocks(STARTING_STOCKS)} className="w-100" style={{height: '50px'}} color="light" size="lg">Play</MDBBtn>
				</Link>
				</div>
			</div>
			
			<div className="mt-2 row justify-content-center" style={{textAlign: "center"}}>
				<h5>{greeting}</h5>
			</div>			
    </>
  )
}