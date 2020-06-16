
const router = require('express').Router();
const passport = require('passport');

// GET / (home)
const usersCtrl = require('../controllers/users');
router.get('/', usersCtrl.index);
router.get('/home', usersCtrl.index);

// POST / (recipe)
router.post('/add-recipe',  usersCtrl.addRecipe);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/google');
}

// DELETE /facts/:id
// router.delete('/facts/:id', studentsCtrl.delRecipe);

//OAUTH Routess
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/recipes',
    failureRedirect: '/'
  }
));

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

const recipeCtrl = require('../controllers/recipe')

router.get('/recipes', recipeCtrl.index);

module.exports = router;