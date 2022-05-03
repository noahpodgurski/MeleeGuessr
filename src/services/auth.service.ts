const axios = require('axios');
const SERVER_IP = process.env.REACT_APP_SERVER_IP;
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
  const params = new URLSearchParams();
  params.append('email', email);
  params.append('password', password);
  return axios
    .post(`${SERVER_IP}/login`, params)
    .then((response:any) => {
      if (response.data.data) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }
      return response.data;
    });
};

const logout = () => {
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