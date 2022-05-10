import toast from "react-hot-toast";
import { PostStat } from "../models/Stat";
const axios = require('axios');
const SERVER_IP = process.env.REACT_APP_SERVER_IP;
// if not prod server_ip = "" todo
const updateStats = (stat:PostStat) => {
  const params = new URLSearchParams()
  params.append('stat', JSON.stringify(stat));
  return axios
    .post(`${SERVER_IP}/update-stats`, params)
    .then((response:any) => {
      return response.data;
    })
    .catch((err:any) => {
      toast.error("Unexpected error...")
    });
};

const getStats = (userId:string) => {
  return axios
    .get(`${SERVER_IP}/get-stats`,
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

const getAllStats = () => {
  return axios
    .get(`${SERVER_IP}/get-all-stats`,
    {},
    {
      "Content-Type": "application/json"
    })
    .then((response:any) => {
      return response.data;
    });
};

const reportClip = (clip:string | undefined) => {
  if (!clip) return;
  const params = new URLSearchParams()
  params.append('clipSrc', clip);
  return axios
    .post(`${SERVER_IP}/report-clip`, params)
    .then((response:any) => {
      return response.data;
    })
    .catch((err:any) => {
      toast.error("Unexpected error...")
    });
};

const UserService = {
  updateStats,
  getStats,
  getAllStats,
  reportClip
}
export default UserService;