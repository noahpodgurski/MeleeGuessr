import axios from "axios";
import { loadUser, userStore } from "~/state/userStore";
const SERVER_IP = "https://64vwhnl0nk.execute-api.us-east-1.amazonaws.com/Prod";
// if not prod server_ip = "" todo
const register = (email:string, username:string, password:string) => {
  const params = new URLSearchParams();
  params.append('email', email);
  params.append('username', username);
  params.append('password', password);
  return axios.post(`${SERVER_IP}/register`, params)
  .then((response) => {
    return response;
  });
};

const login = (email:string, password:string) => {
  // const params = new URLSearchParams();
  // params.append('email', email);
  // params.append('password', password);
  return axios
    .post(`${SERVER_IP}/login`, {
      email,
      password
    }, {headers: {'Content-Type': 'application/json'}})
    .then((response) => {
      if (response.data.data) {
        localStorage.setItem("user", response.data.data);
        loadUser(response.data.data);
      }
      return response;
    });
};

const logout = () => {
  //todo change from local storage?
  localStorage.removeItem("user");
  // return axios.post(SERVER_IP + "signout").then((response:any) => {
  //   return response.data;
  // });
};
const getCurrentUser = () => {
  return localStorage.getItem("user") || "";
};
const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}
export default AuthService;