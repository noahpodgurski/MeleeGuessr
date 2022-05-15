import { MDBBtn } from "mdb-react-ui-kit"
import { useContext, useMemo } from "react";
import { Link } from "react-router-dom"
import { STARTING_STOCKS } from "../App";
import { randomGreeting } from "../consts/Greetings";
import { StocksContext } from "../hooks/UseStocks";

export const Offline: React.FC = () => {
  return (
    <>
			<div className="full-page d-flex justify-content-center align-items-center m-2" style={{overflow: 'hidden'}}>
				<div>
					{/* Beta {process.env.REACT_APP_PUBLIC_VERSION} */}
					<div className="row justify-content-center">
						<h1 className="logo" style={{textAlign: "center", fontSize: "rem"}}>MeleeGuessr</h1>
						MeleeGuessr is offline for the time being. Thanks for playing!
					</div>
				</div>
			</div>	
    </>
  )
}