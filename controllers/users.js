const User = require('../models/users.js');

module.exports = {
  index,
  addRecipe,
  delRecipe
};

function index(req, res, next) {
  console.log(req.query)
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
  req.user.recipes.push(req.body);
  req.user.save(function (error) {
    res.redirect('/recipes');
  });
}


function delRecipe(req, res, next) {
  User.findOne({ 'recipes._id': req.params.id }, function (error, user) {
    user.recipes.id(req.params.id).remove();
    user.save(function (error) {
      res.redirect('/recipes');
    });
  });
}