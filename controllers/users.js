const User = require('../models/users.js');

module.exports = {
  index,
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
