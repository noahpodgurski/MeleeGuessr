const User = require('./utils/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const convert = require('./utils/convert');
const querystring = require('querystring')

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// login
exports.handler = async (request, context, callback) => {
  const params = querystring.parse(request.body);
  const { email, password } = params;
  if (!email || typeof email !== 'string'){
    return convert(400, "error", "Invalid email");
  }

  if (password.length < 8){
    return convert(400, "error", "Password too short. Should be at least 8 characters");
  }
  
  const user = await User.findOne({email}).lean();
  if (user && user.password && await bcrypt.compare(password, user.password)){
    //the user,pass combo is a match
    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email,
        username: user.username
      }, 
      process.env.SECRET
    );
    return convert(200, "ok", "Successfully logged in", token)
  }
  
  return convert(400, "error", "Invalid email/password");
};

// const { getStats } = require('./get-stats');