const axios = require('axios');
const API_URL = "http://localhost:4000/"; //todo change server ip and port forward
const register = (email:string, username:string, password:string) => {
  return axios.post(API_URL + "register", {
    email,
    username,
    password,
  },
  {
    "Content-Type": "application/json"
  })
  .then((response:any) => {
    return response.data;
  });
};

const login = (email:string, password:string) => {
  return axios
    .post(API_URL + "login", 
    {
      email,
      password,
    },
    {
      "Content-Type": "application/json"
    })
    .then((response:any) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.token));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  // return axios.post(API_URL + "signout").then((response:any) => {
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