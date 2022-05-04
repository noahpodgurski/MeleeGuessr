import { MDBDataTableV5 } from "mdbreact";
import React, { useContext, useState } from "react";
import './Table.scss';
import UserService from "../services/user.service";
import { GetStat } from "../models/Stat";
import { useEffect } from "react";
import { ILoading, LoadingContext } from "../hooks/UseLoader";
import toast from "react-hot-toast";

export type LeaderboardData = {
  user: string; 
  highScore: number;
}


const Leaderboards: React.FC = () => {
  const [data, setData] = useState<LeaderboardData[]>([]);
  const { setLoading } = useContext<ILoading>(LoadingContext);

  useEffect(() => {
    setLoading(true);
    UserService.getAllStats()
    .then((response:any) => {
      setLoading(false);
      setData(response.data.map((row:GetStat) => {
        return { user: row.username, highScore: row.highScore }
      }))
    })
    .catch((err:any) => {
      setLoading(false);
      toast.error(err.response.data.message);
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