const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectEnsureLogin = require('connect-ensure-login');

const authenticateUser = require('./passport');
const User = require('./user');

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


app.use(session({
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: dbUrl }),
  cookie: {
      maxAge: 1000* 60 * 60 * 24
  }
}))

// passport session
app.use(passport.initialize())
app.use(passport.session())
authenticateUser(passport);

// const store = new MongoDBStore({
//   url: dbUrl,
//   secret,
//   touchAfter: 24 * 60 * 60
// });

// store.on("error", function (e) {
//   console.log("SESSION STORE ERROR", e)
// })

// const sessionConfig = {
//   store,
//   name: 'session',
//   secret,
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//       httpOnly: true,
//       // secure: true,
//       expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
//       maxAge: 1000 * 60 * 60 * 24 * 7
//   }
// }


app.post('/login', async(req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  if (!email || typeof email !== 'string'){
    return res.json({status: 'error', message: 'Invalid email' });
  }

  if (password.length < 8){
    return res.json({status: 'error', message: "Password too short. Should be at least 8 characters"});
  }
  
  const user = await User.findOne({email}).lean();
  console.log(user);
  if (await bcrypt.compare(password, user.password)){
    //the user,pass combo is a match
    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email
      }, 
      SECRET
    );

    return res.json({ status: 'ok', message: 'Successfully logged in', token });
  }
  
  res.json({status: 'error', message: 'Invalid email/password' })
})

app.post('/register', async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  if (!email || typeof email !== 'string'){
    return res.json({status: 'error', message: 'Invalid email' });
  }

  if (password.length < 8){
    return res.json({status: 'error', message: "Password too short. Should be at least 8 characters"});
  }

  try {
    const hashedPass = await bcrypt.hash(password, 12);
    
    console.log(email)
    console.log(hashedPass)
    const response = await User.create({
      email,
      password: hashedPass
    })

    console.log('response')
    console.log(response)
  
  } catch(err) {
    //duplicate email
    if (err.code === 11000){
      return res.json({ status: 'error', message: "email already in use" });
    }
    throw error;
  }

  res.json({status: 'ok', message: 'Successfully Registered'});
})

app.get('/test', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.json({message: "secret!"});
})


// const { getToken, COOKIE_OPTIONS, getRefreshToken } = require("./authenticate")
// app.post('/login', passport.authenticate('local'), (req, res) => {
//   console.log('HERE')
//   console.log(req.user)
//   const token = getToken({ _id: req.user._id })
//   const refreshToken = getRefreshToken({ _id: req.user._id })
//   User.findById(req.user._id).then(
//     user => {
//       user.refreshToken.push({ refreshToken })
//       user.save((err, user) => {
//         if (err) {
//           res.statusCode = 500
//           res.send(err)
//         } else {
//           res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
//           res.send({ success: true, token })
//         }
//       })
//     },
//     err => next(err)
//   )
// })

app.listen(PORT, () => {
  console.log(`Server online :${PORT}`)
})