
const local_strategy = require("passport-local");
const bcrypt = require('bcryptjs');

const User = require('./user');

const LocalStrategy = local_strategy.Strategy;

const customFields = {
  usernameField: 'email',
  passwordField: 'password',
}

const verifyCallback = (email, password, done) => {

  console.log('here1')
  User.findOne({ email })
  .then (user => {
    console.log('here2')
      if(!user){ return done(null, false) } 
      else {
        console.log("is it valid?")
        const isValid = bcrypt.compareSync(password, user.password)
        if(!isValid){
          return done(null, false)
        }else{
          console.log("valid!")
          return done(null, user)
        }
      }
  })
}

const authenticateUser = (passport) => {
  passport.use(new LocalStrategy(customFields, verifyCallback))
  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => { User.findById(id)
  .then(user => done(null, user))
  .catch(err => done(err))
  });
};

module.exports = authenticateUser;