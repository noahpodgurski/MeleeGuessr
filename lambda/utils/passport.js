const local_strategy = require("passport-local");
const bcrypt = require('bcryptjs');

const User = require('./user');

const LocalStrategy = local_strategy.Strategy;

const customFields = {
  emailField: 'email',
  usernameField: 'username',
  passwordField: 'password',
}

const verifyCallback = (email, password, done) => {
  User.findOne({ email })
  .then (user => {
      if(!user){ return done(null, false) } 
      else {
        const isValid = bcrypt.compareSync(password, user.password)
        if(!isValid){
          return done(null, false)
        }else{
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