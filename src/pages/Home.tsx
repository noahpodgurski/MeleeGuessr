import { MDBBtn } from "mdb-react-ui-kit"
import { useContext, useMemo } from "react";
import { Link } from "react-router-dom"
import { STARTING_STOCKS } from "../App";
import { randomGreeting } from "../consts/Greetings";
import { StocksContext } from "../hooks/UseStocks";
import { Alert } from 'react-bootstrap';

export const Home: React.FC = () => {
  const { setStocks } = useContext<any>(StocksContext);	
	const greeting = useMemo(() => {
		return randomGreeting();
	}, [])
  return (
    <>
			<Alert variant='warning'>
				If you enjoy the site, and would like to continue using it, please consider becoming a {<a rel="noreferrer" target="_blank" href="https://www.patreon.com/noahp">patreon</a>}, the server costs to stream video are <strong>expensive</strong>. Even $5/month would be a massive help - Noah
			</Alert>
			<div className="full-page d-flex justify-content-center align-items-center m-2" style={{overflow: 'hidden'}}>
				<div>
					Beta {process.env.REACT_APP_PUBLIC_VERSION}
					<div className="row justify-content-center">
						<h1 className="logo" style={{textAlign: "center", fontSize: "rem"}}>MeleeGuessr</h1>
						<Link className="w-100" to="/play">
							<MDBBtn onClick={() => setStocks(STARTING_STOCKS)} className="w-100" style={{height: '50px'}} color="light" size="lg">Play</MDBBtn>
						</Link>
					</div>
					<div className="row justify-content-center mt-2">
						<Link className="w-100" to="/leaderboards">
							<MDBBtn onClick={() => setStocks(STARTING_STOCKS)} className="w-100" style={{height: '50px'}} color="secondary" size="lg">Leaderboards</MDBBtn>
						</Link>
					</div>
				</div>
			</div>
			
			<div className="w-100" style={{textAlign: "center", overflow: 'hidden'}}>
				<h5>{greeting}</h5>
			</div>			
    </>
  )
}