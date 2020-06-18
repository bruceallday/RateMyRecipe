const User = require('../models/users.js');
const Recipe = require('../models/recipes.js');

module.exports = { index, addRecipe, delRecipe };

function index(req, res, next) {
  let modelQuery = req.query.name ? { name: new RegExp(req.query.name, 'i') } : {};
  let sortKey = req.query.sort || 'name';
  User.find(modelQuery)
    .sort(sortKey).exec(function (err, users) {
      if (err) return next(err);
      Recipe.find({}, function (error, recipes) {
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
  const data = req.body;
  User.findOne({ 'users._id': req.body.id }, function (error, user) {
    console.log("user", user)

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
  // User.findOne({ 'recipes._id': req.params.id }, function (error, user) {
  //   user.recipes.id(req.params.id).remove();
  //   user.save(function (error) {
  //     res.redirect('/recipes');
  //   });
  // });
}

