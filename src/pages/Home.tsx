import { randomGreeting } from "../consts/Greetings";
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
		<Grid container minHeight="90vh" justifyContent="center" alignItems="center" class="nav-m">
			<Container maxWidth="sm">
				<Grid xs={12}>
					<Typography style={{"text-align": "center", "margin-right": "70%"}} variant="subtitle1" color="thistle">v2.0</Typography>
					<h1 class="logo" style={{"text-align": "center", "font-size": "2.5rem"}}>MeleeGuessr</h1>
				</Grid>
				<Grid xs={12} lg={6} class="centered">
					<Button sx={{mb: 1}} color="secondary" href="/play" variant="contained" style={{height: '50px', width: '100%'}}>Play</Button>
				</Grid>
				<Grid xs={12} lg={6} class="centered">
					<Button sx={{mb: 1}} href="/leaderboards" variant="contained" style={{height: '50px', width: '100%'}} color="primary" >Leaderboards</Button>
				</Grid>
				<Grid xs={12} lg={6} class="centered">
					<Button href="/about" variant="text" style={{height: '50px', width: "100%"}} color="primary">About</Button>
				</Grid>
				{/* <h5 class="centered text-white">{greeting()}</h5> */}
			</Container>
			<div class="row justify-content-center mt-2">
			</div>
		</Grid>
			
    </>
  )
}