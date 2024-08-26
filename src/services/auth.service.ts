import axios from "axios";
const SERVER_IP = "https://64vwhnl0nk.execute-api.us-east-1.amazonaws.com/Prod";
// if not prod server_ip = "" todo
const register = (email:string, username:string, password:string) => {
  const params = new URLSearchParams();
  params.append('email', email);
  params.append('username', username);
  params.append('password', password);
  return axios.post(`${SERVER_IP}/register`, params)
  .then((response:any) => {
    return response.data;
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
    }, {headers: {'Access-Control-Allow-Origin': '*'}})
    .then((response:any) => {
      if (response.data.data) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }
      return response.data;
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
  return JSON.parse(localStorage.getItem("user") || "{}");
};
const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}
export default AuthService;