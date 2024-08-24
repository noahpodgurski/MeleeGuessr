import { STARTING_STOCKS } from "../App";
import { randomGreeting } from "../consts/Greetings";
import { StocksContext } from "../components/common/Stocks";
import { Component, createMemo } from "solid-js";
import { Button, Container, Grid } from "@suid/material";
import toast from "solid-toast";

export const Home: Component = () => {
	const greeting = createMemo(() => {
		return randomGreeting();
	}, [])
  return (
    <>
		<Grid container minHeight="100vh" justifyContent="center" alignItems="center">
			<Container maxWidth="sm">
			{/* Beta {process.env.REACT_APP_PUBLIC_VERSION} */}
				<h1 class="logo" style={{"text-align": "center", "font-size": "4rem"}}>MeleeGuessr</h1>
				<div class="centered">
					<Button color="secondary" href="/play" onClick={() => StocksContext.stocks = STARTING_STOCKS} variant="contained" style={{height: '50px', width: "200px"}}>
						Play
					</Button>
				</div>
				{/* <h5 class="centered text-white">{greeting()}</h5> */}
			</Container>
			{/* <div class="row justify-content-center mt-2">
				<Link class="w-100" to="/leaderboards">
					<MDBBtn onClick={() => StocksContext.stocks = STARTING_STOCKS} class="w-100" style={{height: '50px'}} color="secondary" size="lg">Leaderboards</MDBBtn>
				</Link>
			</div> */}
		</Grid>
			
    </>
  )
}