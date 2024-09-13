import { Component, createEffect, createSignal } from 'solid-js';
import './Table.scss';
import UserService from "../services/user.service";
import { useLoader } from "../components/common/Loader";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Grid, Container } from '@suid/material';
import { Loader, setLoaderType } from '~/components/Loader';
// import { createToast } from "../components/common/toaster";

export type LeaderboardData = {
  username: string; 
  highScore: number;
  correct: number;
  incorrect: number;
}

const mockData: LeaderboardData[] = [
  { username: 'player1', highScore: 1500, correct: 25, incorrect: 5 },
  { username: 'player2', highScore: 1400, correct: 22, incorrect: 8 },
  { username: 'player3', highScore: 1300, correct: 20, incorrect: 10 },
  { username: 'player4', highScore: 1200, correct: 18, incorrect: 12 },
  { username: 'player5', highScore: 1100, correct: 16, incorrect: 15 },
  { username: 'player6', highScore: 1050, correct: 14, incorrect: 17 },
  { username: 'player7', highScore: 1000, correct: 12, incorrect: 20 },
  { username: 'player8', highScore: 950, correct: 10, incorrect: 22 },
  { username: 'player9', highScore: 900, correct: 8, incorrect: 25 },
  { username: 'player10', highScore: 850, correct: 6, incorrect: 28 },
  { username: 'player11', highScore: 800, correct: 25, incorrect: 5 },
  { username: 'player12', highScore: 750, correct: 22, incorrect: 8 },
  { username: 'player13', highScore: 700, correct: 20, incorrect: 10 },
  { username: 'player14', highScore: 650, correct: 18, incorrect: 12 },
  { username: 'player15', highScore: 600, correct: 16, incorrect: 15 },
  { username: 'player16', highScore: 550, correct: 14, incorrect: 17 },
  { username: 'player17', highScore: 500, correct: 12, incorrect: 20 },
  { username: 'player18', highScore: 450, correct: 10, incorrect: 22 },
  { username: 'player19', highScore: 400, correct: 8, incorrect: 25 },
  { username: 'player20', highScore: 350, correct: 6, incorrect: 28 },
  { username: 'player21', highScore: 300, correct: 25, incorrect: 5 },
  { username: 'player22', highScore: 250, correct: 22, incorrect: 8 },
  { username: 'player23', highScore: 200, correct: 20, incorrect: 10 },
  { username: 'player24', highScore: 150, correct: 18, incorrect: 12 },
  { username: 'player25', highScore: 100, correct: 16, incorrect: 15 },
  { username: 'player26', highScore: 90, correct: 14, incorrect: 17 },
  { username: 'player27', highScore: 80, correct: 12, incorrect: 20 },
  { username: 'player28', highScore: 70, correct: 10, incorrect: 22 },
  { username: 'player29', highScore: 60, correct: 8, incorrect: 25 },
  { username: 'player30', highScore: 50, correct: 6, incorrect: 28 },
];

const Leaderboards: Component = () => {
  const [data, setData] = createSignal<LeaderboardData[]>([]);
  const [loading, {setLoading}] = useLoader() as any;

  createEffect(() => {
    setLoaderType(true);
    // setData(mockData)
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
  });

  return (
    <Grid container minHeight="90vh" justifyContent="center" class="nav-m">
        <Container maxWidth="md">
          <Grid sx={{width: "100%", mt: 5, mb: 5}} xs={12} justifyContent="center">
            <TableContainer component={Paper} >
              { !loading() && <Table>
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
                      <TableCell >{`#${i+1}`}</TableCell>
                      <TableCell component="th" scope="row">
                        {row.username}
                      </TableCell>
                      <TableCell >{row.highScore}</TableCell>
                      <TableCell >{row.correct}</TableCell>
                      <TableCell >{row.incorrect}</TableCell>
                      <TableCell >{row.correct+row.incorrect > 0 ? (row.correct / (row.correct+row.incorrect)).toFixed(2) : 0}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table> }
            </TableContainer>
        </Grid>
      </Container>
    </Grid>
  );
};
export default Leaderboards;