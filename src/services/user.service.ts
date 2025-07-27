import axios from "axios";
const SERVER_IP = import.meta.env.VITE_SERVER_IP;
// const SERVER_IP =
//   "https://64vwhnl0nk.execute-api.us-east-1.amazonaws.com/Prod/";
// if not prod server_ip = "" todo

const getStats = () => {
  const auth = localStorage.getItem("user")
    ? { Authorization: `Bearer ${localStorage.getItem("user")}` }
    : {};
  return axios
    .get(`${SERVER_IP}/stats`, {
      headers: {
        "Content-Type": "application/json",
        ...auth,
      },
      params: {
        page: 1,
      },
    })
    .then((response) => {
      return response;
    });
};

const getAllStats = () => {
  return axios
    .get(`${SERVER_IP}/stats`, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        page: 1,
      },
    })
    .then((response) => {
      return response;
    });
};

const reportClip = (clip: string | undefined) => {
  if (!clip) return;
  const params = new URLSearchParams();
  params.append("clipSrc", clip);
  return axios
    .post(`${SERVER_IP}/report-clip`, params)
    .then((response) => {
      return response;
    })
    .catch((err: any) => {
      // createToast({
      //   title: "Unexpected error...",
      //   duration: 2000,
      //   placement: "top-end",
      // })
    });
};

const UserService = {
  getStats,
  getAllStats,
  reportClip,
};
export default UserService;
