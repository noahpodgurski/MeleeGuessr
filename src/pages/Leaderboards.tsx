import { Component, createEffect, createSignal } from 'solid-js';
import './Table.scss';
import UserService from "../services/user.service";
import { useLoader } from "../components/common/Loader";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, useTheme, Grid } from '@suid/material';
import { Loader } from '~/components/Loader';
// import { createToast } from "../components/common/toaster";

export type LeaderboardData = {
  username: string; 
  highScore: number;
}


const Leaderboards: Component = () => {
  const [data, setData] = createSignal<LeaderboardData[]>([]);
  const [, {setLoading}] = useLoader() as any;
  const theme = useTheme();

  createEffect(() => {
    setLoading(true);
    UserService.getAllStats()
    .then((response) => {
      console.log(response)
      // toast(response.data.message);
      setLoading(false);
      setData(response.data.data);
    })
    .catch((err:any) => {
      setLoading(false);
    })
  }, [createEffect]);

  return (
    <Grid container sx={{justifyContent: "center"}}>
      <Loader />
			<div class="row justify-content-center w-50">
        <TableContainer component={Paper} >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>High Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data().map((row) => (
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.username}
                  </TableCell>
                  <TableCell >{row.highScore}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Grid>
  );
};
export default Leaderboards;