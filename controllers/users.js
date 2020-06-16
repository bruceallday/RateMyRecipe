const User = require('../models/users.js');
const Recipe = require('../models/recipes.js');

const mongoose = require('mongoose');
const db_collections = mongoose.connection.collections;
// console.log('collections from db in uxer controllers', db_collections)

module.exports = {
  index,
  addRecipe,
  delRecipe
};

function index(req, res, next) {
  // Make the query object to use with user.find based up
  // the user has submitted the search form or now
  let modelQuery = req.query.name ? { name: new RegExp(req.query.name, 'i') } : {};
  // Default to sorting by name
  let sortKey = req.query.sort || 'name';
  User.find(modelQuery)
    .sort(sortKey).exec(function (err, users) {
      if (err) return next(err);
      // Passing search values, name & sortKey, for use in the EJS
      res.render('home', {
        users,
        user: req.user,
        name: req.query.name,
        sortKey
      });
    });
}

function addRecipe(req, res, next) {
  console.log('req body ', req.body)
  
  // req.user.save(function (error) {
  //   // res.redirect('/recipes');
  // });
  res.redirect('/recipes');
}

function delRecipe(req, res, next) {
  User.findOne({ 'recipes._id': req.params.id }, function (error, user) {
    user.recipes.id(req.params.id).remove();
    user.save(function (error) {
      res.redirect('/recipes');
    });
  });
}