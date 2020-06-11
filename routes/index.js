const router = require('express').Router();
const passport = require('passport');

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/recipes',
    failureRedirect: '/recipes'
  }
));

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/home');
});

