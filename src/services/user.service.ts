import { PostStat } from "../models/Stat";

const axios = require('axios');
const API_URL = "http://localhost:4000/"; //todo change this to frontend and add to proxy

const updateStats = (stat:PostStat) => {
  return axios
    .post(API_URL + "update-stats", 
    {
      stat,
    },
    {
      "Content-Type": "application/json"
    })
    .then((response:any) => {
      return response.data;
    });
};

const getStats = (userId:string) => {
  return axios
    .get(API_URL + "get-stats",
    {
      params: { userId: userId },
    },
    {
      "Content-Type": "application/json"
    })
    .then((response:any) => {
      return response.data;
    });
};

const UserService = {
  updateStats,
  getStats,
}
export default UserService;