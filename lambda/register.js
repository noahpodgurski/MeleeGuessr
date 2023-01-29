const User = require('./utils/user');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const convert = require('./utils/convert');
const querystring = require('querystring');

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

//register
exports.handler = async (request, context, callback) => {
  const params = querystring.parse(request.body);
  const { email, username, password } = params;

  if (!email || typeof email !== 'string'){
    return convert(400, "error", "Invalid email");
  }

  if (!username || typeof username !== "string"){
    return convert(400, "error", "Invalid username");
  }

  if (password.length < 8){
    return convert(400, "error", "Password too short. Should be at least 8 characters");
  }

  try {
    const hashedPass = await bcrypt.hash(password, 12);
    
    const response = await User.create({
      email: email,
      username: username,
      password: hashedPass
    });
  
  } catch(err) {
    //duplicate email
    if (err.code === 11000){
      return convert(400, "error", "email already in use");
      // return res.json({ status: 'error', message: "email already in use" });
    }
    throw error;
  }

  return convert(200, "ok", "Successfully Registered");
};

// const { getStats } = require('./get-stats');