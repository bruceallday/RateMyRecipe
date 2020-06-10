// Require modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
require('./config/passport.js');

//require the todo database
const todoDB = require('./data/todo-db')

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
  res.redirect('/home');
});

app.get('/home', function(req, res){
  res.render('home');
});

app.get('/recipes', function (req, res) {
  res.render('recipes');
});

//Sample code 
// app.get('/todos', function(req, res){
//   res.render('todos/index', {
//     todos: todoDB.getAll()
//   });
// });

app.listen(3000, function(){
  console.log('listening on port 3000');
});
