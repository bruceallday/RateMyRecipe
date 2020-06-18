const User = require('../models/users.js');
const Recipe = require('../models/recipes.js');

module.exports = { index, addRecipe, delRecipe, updateRecipe };

function index(req, res, next) {
  let modelQuery = req.query.name ? { name: new RegExp(req.query.name, 'i') } : {};
  let sortKey = req.query.sort || 'name';
  User.find(modelQuery)
    .sort(sortKey).exec(function (err, users) {
      if (err) return next(err);
      Recipe.find({}, function (error, recipes) {
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
  const data = req.body;
  User.findOne({ 'users._id': req.body.id }, function (error, user) {
    const newRecipe = new Recipe({
      title: data.recipeTitle,
      time: data.recipeTime,
      description: data.recipeDescription,
      username: user.name,
      upvotes: 0,
      downvotes: 0
    });
    newRecipe.save(function (error) {
      res.redirect('/recipes');
    });
  });
}

function delRecipe(req, res, next) {
  Recipe.deleteOne({ '_id': req.params.id }, function (err, recipe) {
    res.redirect('/recipes');
  });
}

// Update recipe
function updateRecipe(req, res, next) {
  console.log('request in update recipe controller >>>>> req.params', req.params)
  Recipe.findById({ '_id': req.params.id }, function (err, recipe) {
    console.log('error >>>>> err', err)
    console.log('recipe from database >>>>> recipe', recipe)
    res.render('update-recipe', {
      recipe
    });
  })
}


