
const router = require('express').Router();
const passport = require('passport');

// ----- OAUTH Routes and Helpers -----
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/google');
}

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
// ----- OAUTH ends -----


// GET / aka home page
const usersCtrl = require('../controllers/users');
router.get('/', usersCtrl.index);
router.get('/home', usersCtrl.index);

// GET /recipes page
const recipeCtrl = require('../controllers/recipe')
router.get('/recipes', isLoggedIn, recipeCtrl.index);

// POST /add-recipe
router.post('/add-recipe', isLoggedIn, recipeCtrl.addRecipe);

// DELETE /recipes/:id
router.delete('/recipes/:id', isLoggedIn, recipeCtrl.delRecipe);

// Update recipe
router.get('/update-recipe/:id', isLoggedIn, recipeCtrl.findRecipe);
router.post('/update-recipe/:id', isLoggedIn, recipeCtrl.updateRecipe);
module.exports = router;