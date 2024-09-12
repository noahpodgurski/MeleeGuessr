import { Button, Container, Grid, Typography } from '@suid/material';
import { useNavigate } from '@solidjs/router';

export const Result = () => {
  const navigate = useNavigate();
  const HS = '9';
  return (
    <>
      <Grid container minHeight="90vh" alignItems='center' justifyContent="center" class="nav-m">
        <Container maxWidth="md">
          <Grid sx={{width: "100%", mt: 5, mb: 5, textAlign: 'center'}} xs={12} justifyContent="center">
            { HS && <Typography variant='h2'>High Score! {HS}</Typography> }
            <Button color="secondary" variant="contained" onClick={() => navigate('/play')}>Retry?</Button>
          </Grid>
        </Container>
      </Grid>
    </>
  )
}