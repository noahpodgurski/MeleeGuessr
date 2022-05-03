import { MDBDataTableV5 } from "mdbreact";
import React, { useState } from "react";
import './Table.scss';
import UserService from "../services/user.service";
import { GetStat } from "../models/Stat";
import { useEffect } from "react";

export type LeaderboardData = {
  user: string; 
  highScore: number;
}


const Leaderboards: React.FC = () => {
  const [data, setData] = useState<LeaderboardData[]>([]);

  useEffect(() => {
    UserService.getAllStats()
    .then((response:any) => {
      setData(response.data.map((row:GetStat) => {
        return { user: row.username, highScore: row.highScore }
      }))
    })
     // eslint-disable-next-line
  }, [useEffect]);
    
  let test = {
    columns: [{label: "User", field: "user"}, {label: "High Score", field: "highScore"}],
    rows: data
  }
  return (
    <div className="d-flex justify-content-center align-items-center mt-1" style={{height: "100%"}}>
			<div className="row justify-content-center w-75">
        <MDBDataTableV5 hover scrollY searching={false} order={['High Score', 'desc']} paging={false} data={test as any} />
      </div>
    </div>
  );
};
export default Leaderboards;