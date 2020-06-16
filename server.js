// Require modules
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const session = require('express-session'); //session middleware
const passport = require('passport');       //passport middleware
const methodOverride = require('method-override');

require('dotenv').config(); //env vars loading

//Create express app
const app = express();

//middleware configs
require('./config/passport.js');
require('./config/database.js');

//Set up the views of the routes
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Configure the express app
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//mount session middleware
app.use(session({
  secret: 'NOT_TELLING',
  resave: false,
  saveUninitialized: true
}))

//start passport and use session
app.use(passport.initialize());
app.use(passport.session());

//Mount routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

//404 error for bad request
app.use(function (req, res) {
  res.status(404).send('Cant find that!');
});

module.exports = app;

// app.listen(3000, function(){
//   console.log('listening on port 3000');
// });
