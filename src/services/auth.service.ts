import axios from "axios";
import { clearPlayStore } from "~/state/playStore";
import { loadUser, resetUser, userStore } from "~/state/userStore";
const SERVER_IP = "https://64vwhnl0nk.execute-api.us-east-1.amazonaws.com/Prod";
// if not prod server_ip = "" todo
const register = (email:string, username:string, password:string) => {
  return axios.post(`${SERVER_IP}/register`, {
      email,
      password,
      username,
    }, {headers: {'Content-Type': 'application/json'}}
  )
  .then((response) => {
    return response;
  });
};

const login = (email:string, password:string) => {
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

const logout = async () => {
  //todo change from local storage?
  localStorage.clear();
  await clearPlayStore();
  await resetUser();
};
const getCurrentUser = () => {
  // return localStorage.getItem("user") || "";
  return userStore.data;
};
const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}
export default AuthService;