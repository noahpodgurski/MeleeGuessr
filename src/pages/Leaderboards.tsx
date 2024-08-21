import { Component, createEffect, createSignal } from 'solid-js';
import './Table.scss';
import UserService from "../services/user.service";
import { GetStat } from "../models/Stat";
import { LoadingContext } from "../components/common/Loader";
// import { createToast } from "../components/common/toaster";

export type LeaderboardData = {
  user: string; 
  highScore: number;
}


const Leaderboards: Component = () => {
  const [data, setData] = createSignal<LeaderboardData[]>([]);

  createEffect(() => {
    LoadingContext.loading = true;
    UserService.getAllStats()
    .then((response:any) => {
      LoadingContext.loading = false;
      setData(response.data
        .sort((row1:GetStat, row2:GetStat) => row2.highScore - row1.highScore )
        .map((row:GetStat) => {
        return { user: row.username, highScore: `${row.highScore}%` }
      }))
    })
    .catch((err:any) => {
      LoadingContext.loading = false;
      // createToast({
      //   title: err.response.data.message,
      //   duration: 2000,
      //   placement: "top-end"
      // })
    })
     // eslint-disable-next-line
  }, [createEffect]);
    
  let test = {
    columns: [{label: "User", field: "user"}, {label: "High Score", field: "highScore", sort: "desc"}],
    rows: data,
  }
  return (
    <div class="d-flex justify-content-center align-items-center mt-1" style={{height: "100%"}}>
			<div class="row justify-content-center w-75">
        {/* todo replace with table */}
        {/* <MDBDataTableV5 hover scrollY searching={false} sortable order={['High Score', 'desc']} paging={false} data={test as any} /> */}
      </div>
    </div>
  );
};
export default Leaderboards;