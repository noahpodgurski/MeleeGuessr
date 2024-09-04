// import { createToast } from "../components/common/toaster";
import { PostStat } from "../models/Stat";
import axios from 'axios';
// const SERVER_IP = process.env.SERVER_IP;
const SERVER_IP = "https://64vwhnl0nk.execute-api.us-east-1.amazonaws.com/Prod/";
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
      // createToast({
      //   title: "Unexpected error...",
      //   duration: 2000,
      //   placement: "top-end",
      // })
    });
};

const getStats = (userId:string) => {
  return axios
    .get(`${SERVER_IP}/get-stats`,
    {
      params: { userId: userId },
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      return response;
    });
};

const getAllStats = () => {
  return axios
    .get(`${SERVER_IP}/stats`,
    {
      headers: {
        "Content-Type": "application/json"
      }, 
      params: {
        page: 1
      }
    })
    .then((response) => {
      return response;
    });
};

const reportClip = (clip:string | undefined) => {
  if (!clip) return;
  const params = new URLSearchParams()
  params.append('clipSrc', clip);
  return axios
    .post(`${SERVER_IP}/report-clip`, params)
    .then((response) => {
      return response;
    })
    .catch((err:any) => {
      // createToast({
      //   title: "Unexpected error...",
      //   duration: 2000,
      //   placement: "top-end",
      // })
    });
};

const UserService = {
  updateStats,
  getStats,
  getAllStats,
  reportClip
}
export default UserService;