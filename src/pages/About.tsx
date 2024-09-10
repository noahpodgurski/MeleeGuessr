import { Button, Container, Grid, Link, Typography } from "@suid/material";

export const About = () => {
  return (
    <>
      <Grid container minHeight="90vh" justifyContent="center" class="nav-m">
        <Container maxWidth="md">
          <Grid sx={{width: "100%", mt: 5, mb: 5}} xs={12} justifyContent="center">
            <Typography variant="h5">
              MeleeGuessr! Guess the player!
            </Typography>
            <Typography variant="body1">
              <br />
              All clips on this site come from .slp files from top players and tournaments. 
              <br />
              While creating an account is not required to use the site, doing so will allow you to track your personal stats and achieve high scores on the leaderboard.
              <br />
              <br />
              Currently, this site is a proof of concept until a more diverse pool of .slp files can be added. 
              <br />
              <b style={{color: "#ff8f96"}}>If you're a top player and want to contribute your clips, feel free to reach out to me on Twitter <Link target="_blank" href="https://x.com/NoahSSBM">@NoahSSBM</Link></b>
              <br />
              <br />
              Upcoming features might include guessing if a player is using a GCC or a rectangle controller, or guessing on mods like Z-jump, notches, etc.
              <br />
              <br />
              (SPOILER) To slightly ruin the magic of the site... <span class="spoiler">It could be deduced that there are essentially zero clips of some older, inactive players here,
              even though they may sometimes show up as choices. This is because archiving matches as .slp files is still relatively new. 
              Another factor is that only a few top players have sent me their .slp files, so the pool of clips isn't quite diverse enough to be sufficiently challenging... <strong><i>yet!</i></strong></span> (SPOILER)
            </Typography>
            <br />
            <br />
            <Typography variant="h6">
              Thanks to:
            </Typography>
            <Typography variant="body1">
              Frank of <Link target="_blank" href="https://slippilab.com/">slippilab.com</Link> for the amazing web-based .slp renderer,
              which allowed the site to switch from sending large video files to smaller .slp files. This saved significantly on data transfer costs and ultimately brought the site back online!
            </Typography>
            <Typography variant="body1">
              Everone who sent me their .slp
            files
            </Typography>
            <Typography variant="body1">
              Fizzi and the Slippi team for making projects like this possible
            </Typography>
            <Typography variant="body1">
              Leslee
            </Typography>
            
            <br />
            <Typography variant="body1">
              Created by <Link target="_blank" href="https://x.com/NoahSSBM">Noah</Link>
            </Typography>
          </Grid>
        </Container>
		</Grid>
    </>
  );
};
