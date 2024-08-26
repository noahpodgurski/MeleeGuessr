import { STARTING_STOCKS } from "../App";
import { randomGreeting } from "../consts/Greetings";
import { StocksContext } from "../components/common/Stocks";
import { Component, createEffect, createMemo } from "solid-js";
import { Button, Container, Grid, Typography } from "@suid/material";
import toast from "solid-toast";
import { useLoader } from "~/components/common/Loader";

export const Home: Component = () => {
	const greeting = createMemo(() => {
		return randomGreeting();
	}, [])

	const [, {setLoading}] = useLoader() as any;
	setLoading(false);
  return (
    <>
		<Grid container minHeight="90vh" justifyContent="center" alignItems="center">
			<Container maxWidth="sm">
				<Typography style={{"text-align": "center", "margin-right": "70%"}} variant="subtitle1" color="thistle">v2.0</Typography>
				<h1 class="logo" style={{"text-align": "center", "font-size": "2.5rem"}}>MeleeGuessr</h1>
				<div class="centered">
					<Button sx={{mb: 1}} color="secondary" href="/play" onClick={() => StocksContext.stocks = STARTING_STOCKS} variant="contained" style={{height: '50px', width: "200px"}}>
						Play
					</Button>
				</div>
				<div class="centered">
					<Button href="/leaderboards" onClick={() => StocksContext.stocks = STARTING_STOCKS} class="w-100" variant="contained" style={{height: '50px'}} color="success" >Leaderboards</Button>
				</div>
				{/* <h5 class="centered text-white">{greeting()}</h5> */}
			</Container>
			<div class="row justify-content-center mt-2">
			</div>
		</Grid>
			
    </>
  )
}