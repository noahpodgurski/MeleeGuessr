const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./user');
const Stat = require('./stat');

// const MongoDBStore = require("connect-mongo")(session);

const dbUrl = process.env.DB_URL;
const SECRET = process.env.SECRET;
const PORT = process.env.PORT;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, 'static')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/login', async(req, res) => {
  // console.log(req.body);

  const { email, password } = req.body;

  if (!email || typeof email !== 'string'){
    return res.json({status: 'error', message: 'Invalid email' });
  }

  if (password.length < 8){
    return res.json({status: 'error', message: "Password too short. Should be at least 8 characters"});
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
      SECRET
    );

    return res.json({ status: 'ok', message: 'Successfully logged in', token });
  }
  
  res.json({status: 'error', message: 'Invalid email/password' })
})

app.post('/register', async (req, res) => {
  // console.log(req.body);

  const { email, username, password } = req.body;

  if (!email || typeof email !== 'string'){
    return res.json({status: 'error', message: 'Invalid email' });
  }

  if (!username || typeof username !== "string"){
    return res.json({status: "error", message: "Invalid username" });
  }

  if (password.length < 8){
    return res.json({status: 'error', message: "Password too short. Should be at least 8 characters"});
  }

  try {
    const hashedPass = await bcrypt.hash(password, 12);
    
    // console.log(email)
    // console.log(hashedPass)
    const response = await User.create({
      email: email,
      username: username,
      password: hashedPass
    })

    // console.log('response')
    // console.log(response)
  
  } catch(err) {
    //duplicate email
    if (err.code === 11000){
      return res.json({ status: 'error', message: "email already in use" });
    }
    throw error;
  }

  res.json({status: 'ok', message: 'Successfully Registered'});
})


app.post('/update-stats', async(req, res) => {
  const { stat } = req.body;

  if (!stat.userId){
    return res.json({ status: "error", message: "Something went wrong..." });
  }

  console.log(stat)
  
  const _stat = await Stat.findOne({userId: stat.userId}).lean();
  console.log('here')
  if (_stat && _stat.userId){
    console.log('found one!')
    await Stat.updateOne({userId: stat.userId}, {
      correct: _stat.correct + (stat.wasCorrect ? 1 : 0),
      incorrect: _stat.incorrect + (stat.wasCorrect ? 0 : 1),
      highScore: (_stat.highScore < stat.score) ? stat.score : _stat.highScore,
      games: stat.final ? _stat.games+1 : _stat.games
    })
    // stat already exists, update it
    //the user,pass combo is a match
    // const token = jwt.sign(
    //   { 
    //     id: user._id, 
    //     email: user.email,
    //     username: user.username
    //   }, 
    //   SECRET
    // );

    // return res.json({ status: 'ok', message: 'Successfully logged in', token });
  } else {
    // stat doesn't exist yet, create new
    const response = await Stat.create({
      userId: stat.userId,
      correct: stat.wasCorrect ? 1 : 0,
      incorrect: stat.wasCorrect ? 0 : 1,
      highScore: stat.wasCorrect ? 1 : 0,
      games: stat.final ? 1 : 0
    })
  }

  console.log(_stat)
  res.json({status: 'success', message: 'beep boop' })
});


app.get('/get-stats', async(req, res) => {
  const { userId } = req.query;
  console.log(userId)
  if (!userId || typeof userId !== 'string'){
    return res.json({status: 'error', message: 'Error grabbing stats' });
  }
  
  const stat = await Stat.findOne({userId}).lean();
  console.log(stat)
  if (stat){
    return res.json({ status: 'ok', message: 'Successfully grabbed data', stat });
  }
  
  res.json({status: 'error', message: 'Invalid email/password' })
})

app.listen(PORT, () => {
  console.log(`Server online :${PORT}`)
})