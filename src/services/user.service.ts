import { PostStat } from "../models/Stat";
const axios = require('axios');
// const SERVER_IP = process.env.REACT_APP_SERVER_IP;

const updateStats = (stat:PostStat) => {
  return axios
    .post("/update-stats", 
    {
      stat,
    },
    {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json"
    })
    .then((response:any) => {
      return response.data;
    });
};

const getStats = (userId:string) => {
  return axios
    .get("/get-stats",
    {
      params: { userId: userId },
    },
    {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json"
    })
    .then((response:any) => {
      return response.data;
    });
};

const getAllStats = () => {
  return axios
    .get("/get-all-stats",
    {},
    {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json"
    })
    .then((response:any) => {
      return response.data;
    });
};

const UserService = {
  updateStats,
  getStats,
  getAllStats
}
export default UserService;