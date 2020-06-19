const User = require('../models/users.js');
const Recipe = require('../models/recipes.js');

module.exports = {
  index,
  addRecipe,
  delRecipe,
  findRecipe,
  updateRecipe,
  updateUpVotes,
  updateDownVotes
};

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

// Add new recipe
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

// Delete recipe
function delRecipe(req, res, next) {
  Recipe.deleteOne({ '_id': req.params.id }, function (err, recipe) {
    res.redirect('/recipes');
  });
}

// Find recipe
function findRecipe(req, res, next) {
  Recipe.findById({ '_id': req.params.id }, function (err, recipe) {
    res.render('update-recipe', {
      recipe
    });
  })
}

// Update recipe
function updateRecipe(req, res, next) {
  Recipe.findById({ '_id': req.params.id }, function (err, recipe) {
    Recipe.replaceOne(
      { '_id': req.params.id },
      {
        title: req.body.recipeTitle,
        time: req.body.recipeTime,
        description: req.body.recipeDescription,
        username: recipe.username,
        upvotes: recipe.upvotes,
        downvotes: recipe.downvotes,
      }, function (err, updatedRecipe) {
        res.redirect('/recipes');
      });
  })
}

// Update upvote
function updateUpVotes(req, res) {
  Recipe.findById({ '_id': req.params.id }, function (err, recipe) {
    console.log("recipe in update upvotes >>>>> recipe", recipe)
    Recipe.replaceOne(
      { '_id': req.params.id },
      {
        title: recipe.title,
        time: recipe.time,
        description: recipe.description,
        username: recipe.username,
        upvotes: recipe.upvotes + 1,
        downvotes: recipe.downvotes,
      }, function (err, updatedRecipe) {
        res.redirect('/recipes');
      });
  })
}

// Update downvote
function updateDownVotes(req, res) {
  Recipe.findById({ '_id': req.params.id }, function (err, recipe) {
    console.log("recipe in update downvotes >>>>> recipe", recipe)
    Recipe.replaceOne(
      { '_id': req.params.id },
      {
        title: recipe.title,
        time: recipe.time,
        description: recipe.description,
        username: recipe.username,
        upvotes: recipe.upvotes,
        downvotes: recipe.downvotes - 1,
      }, function (err, updatedRecipe) {
        res.redirect('/recipes');
      });
  })
}

