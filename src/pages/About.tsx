import { Button, Container, Grid, Link, Typography } from "@suid/material";

export const About = () => {
  return (
    <>
      <Grid container minHeight="90vh" justifyContent="center" class="nav-m">
        <Container maxWidth="md">
          <Grid sx={{width: "100%", mt: 5, mb: 5}} xs={12} justifyContent="center">
            <Typography variant="body1">
              Creating an account is not necessary to play.
              Using this site with an account allows high score tracking on leaderboards.
              All clips are from .slp files from top players and tournaments. 
              <br />
              <br />
              This site is mostly a proof of concept until there can be more diverse .slps added to the pool. <b>If you're a top player and would like
              to add your clips to the site, please reach out to me on Twitter <Link target="_blank" href="https://x.com/NoahSSBM">@NoahSSBM</Link></b>
              <br />
              <br />
              (SPOILER) To slightly ruin the magic of the site... <span class="spoiler">It could be deduced that there are essentially zero clips of some older, inactive players here, even though
              they may show up as choices. This is because archiving matches as .slp files is still relatively new - 
              but don't ruin the magic for others who don't understand yet! :3</span> (SPOILER)
            </Typography>
            <br />
            <br />
            <Typography variant="h6">
              Thanks to:
            </Typography>
            <Typography variant="body1">
              Frank of <Link target="_blank" href="https://slippilab.com/">slippilab.com</Link> for the amazing web-based .slp renderer. 
              This allowed the project to move from sending big video data to the client,
               to sending the smaller .slp files instead, saving $ on data transfer costs. 
              Ultimately the reason the site is back online!
            </Typography>
            <Typography variant="body1">
              All the top players who sent me their .slp
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
