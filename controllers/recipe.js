const User = require('../models/users.js');
const Recipe = require('../models/recipes.js');

module.exports = { index, addRecipe, delRecipe };

function index(req, res, next) {
  // console.log("req in recipes conroller >>>>", req)
  // // Make the query object to use with user.find based up
  // the user has submitted the search form or now
  let modelQuery = req.query.name ? { name: new RegExp(req.query.name, 'i') } : {};
  // // Default to sorting by name
  let sortKey = req.query.sort || 'name';
  User.find(modelQuery)
    .sort(sortKey).exec(function (err, users) {
      if (err) return next(err);
      Recipe.find({}, function(error, recipes) {
        console.log('recipes from databse >>>> ', (recipes))
        res.render('recipes', {
          users,
          recipes,
          user: req.user,
          name: req.query.name,
          sortKey
        });
      })
  })
}

function addRecipe(req, res, next) {
  // console.log('req body ', req.body)
  const data = req.body;
  User.findOne({ 'users._id': req.body.id }, function (error, user) {
    console.log("user", user)
    
    const newRecipe = new Recipe({
      title: data.recipeTitle,
      time: data.recipeTime,
      description: data.recipeDescription,
      username: user.name,
      upvotes:0,
      downvotes:0
    });
    newRecipe.save(function (error) {
      // return callBack(null, newUser);
      res.redirect('/recipes');
    });
  });
}

function delRecipe(req, res, next) {
  // User.findOne({ 'recipes._id': req.params.id }, function (error, user) {
  //   user.recipes.id(req.params.id).remove();
  //   user.save(function (error) {
  //     res.redirect('/recipes');
  //   });
  // });
}

