import { Component, createEffect, createSignal } from 'solid-js';
import './Table.scss';
import UserService from "../services/user.service";
import { useLoader } from "../components/common/Loader";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, useTheme, Grid, Container } from '@suid/material';
import { Loader, setLoaderType } from '~/components/Loader';
// import { createToast } from "../components/common/toaster";

export type LeaderboardData = {
  username: string; 
  highScore: number;
  correct: number;
  incorrect: number;
}


const Leaderboards: Component = () => {
  const [data, setData] = createSignal<LeaderboardData[]>([]);
  const [, {setLoading}] = useLoader() as any;
  const theme = useTheme();

  createEffect(() => {
    setLoaderType(true);
    setLoading(true);
    UserService.getAllStats()
    .then((response) => {
      // toast(response.data.message);
      setLoading(false);
      setData(response.data.data);
    })
    .catch((err:any) => {
      setLoading(false);
    })
  }, [createEffect]);

  return (
    <Grid container minHeight="90vh" justifyContent="center" class="nav-m">
        <Container maxWidth="md">
          <Grid sx={{width: "100%", mt: 5, mb: 5}} xs={12} justifyContent="center">
          <Loader />
          <div class="row justify-content-center">
            <TableContainer component={Paper} >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>High Score</TableCell>
                    <TableCell>Total Correct</TableCell>
                    <TableCell>Total Incorrect</TableCell>
                    <TableCell>% Correct</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data().map((row, i) => (
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell >{`Rank ${i+1}`}</TableCell>
                      <TableCell component="th" scope="row">
                        {row.username}
                      </TableCell>
                      <TableCell >{row.highScore}</TableCell>
                      <TableCell >{row.correct}</TableCell>
                      <TableCell >{row.incorrect}</TableCell>
                      <TableCell >{(row.correct / (row.correct+row.incorrect)).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
      </Container>
    </Grid>
  );
};
export default Leaderboards;