const axios = require('axios');
// const SERVER_IP = process.env.REACT_APP_SERVER_IP;
const register = (email:string, username:string, password:string) => {
  return axios.post("/register", {
    email,
    username,
    password,
  },
  {
    "Content-Type": "application/json",
  })
  .then((response:any) => {
    return response.data;
  });
};

const login = (email:string, password:string) => {
  return axios
    .post("/login", 
    {
      email,
      password,
    },
    {
      "Content-Type": "application/json",
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