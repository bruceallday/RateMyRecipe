// require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/users.js');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
},
  function (accessToken, refreshToken, profile, callBack) {
    User.findOne({ 'googleId': profile.id }, function (error, user) {
      if (error) return callBack(error);
      if (user) {
        console.log('user found >>', user)
        return callBack(null, user);
      } else {
        console.log('user not found >> new profile >>', profile.displayName)
        const newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        });
        newUser.save(function (error) {
          if (error) return callBack(error);
          return callBack(null, newUser);
        });
      }
    });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (error, user) {
    done(error, user);
  });
});