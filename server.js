// Require modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
require('./config/passport.js');
require('./config/database.js');

//Create express app
const app = express();

//Configure the app
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Mount middleware
app.use(cookieParser());
app.use(session({
  secret: 'NOT_TELLING',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

//Mount routes
app.get('/', function(req, res){
  res.redirect('home');
});

app.get('/home', function(req, res){
  res.render('home');
});

app.get('/recipes', function (req, res) {
  res.render('recipes');
});

app.get('/user-recipes', function (req, res) {
  res.render('user-recipes');
});

app.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

app.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/recipes',
    failureRedirect: '/home'
  }
));

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/home');
});

app.listen(3000, function(){
  console.log('listening on port 3000');
});
