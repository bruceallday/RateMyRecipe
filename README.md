# Rate my recipes!
![](./screenshots/screenshot.png)

### Installation
 1. fork/clone project.
 2. cd into root of project.
 3. ```yarn``` to install all dependancies.
 4. ```yarn start``` to spin up the local server.
 5. see the project at ```http://localhost:3000/``` siung up/log in with OAuth.
 6. [Sign up and leave a recipe!](https://rate-my-recipe.herokuapp.com/)

## Technologies used
* [MongoDB](https://www.mongodb.com/)
* [Expressjs](https://expressjs.com/)
* [Node](https://nodejs.org/)
* [Ejs](https://ejs.co/)
* [CSS3](https://css-tricks.com/)
* [Bootstrap](https://getbootstrap.com/)
* [OAuth 2.0](https://oauth.net/2/)

## Project planning
 * [Entity Relationship Diagram (ERD)](https://app.lucidchart.com/invitations/accept/396b21e3-808b-4085-beb1-f905c40158f1)
 * [Trello board](https://trello.com/b/wYkU0vrk/ga)
 * [Wire frame designs](https://git.generalassemb.ly/Bruce-TO/RateMyRecipe/tree/master/wireframes)

## Features
 * Secure OAuth authentication and authorization 
 * Add your recipes to the mongoDB atlas database
 * Upvote or downvote other users recipes
 * Learn cool new recipes from cool new people

## Model View Controller - MVC methodology 
Creating a new mongoose schema and exporting as a ```NewSchema``` **Model** in ```models/models.js```
```javascript
const mongoose = require('mongoose');
const newSchema = new mongoose.Schema({
  id: String,
  title: String,
}, {
  timestamps: true
});
module.exports = mongoose.model('NewSchema', newSchema);
```
Index controller to handle the ```user``` and ```recipes``` data between our mongoDB and our .ejs **View** in ```controllers/controller.js```
```javascript
function index(req, res, next) {
  //Search for user based on query
  User.find(query)
    .sort(param).exec(function (err, users) {
      //Return all recipes from database
      Recipe.find({}, function (error, recipes) {
        //Pass user and recipes variables to our .ejs 'recipes'  view
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
```
Defining the route that invokes our recipe **Controller** ```recipeCtrl.index``` function in  ```routes/routes.js```
```javascript
const recipeCtrl = require('../controllers/recipe')
router.get('/recipes', isLoggedIn, recipeCtrl.index);
```
Use ejs template tagging to dynamically change the views based on the data passed from the controller ```views/index.html```
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Welcome</title>
  </head>
  <body>
    <div>
      <% if (user) { %>
      <a href="/logout">Log out</a>
      <% } else { %>
      <a href="/auth/google">Log In</a>
      <% } %>
    </div>
  </body>
</html>
```
## Dynamic user card

## See authorised user options
View authorized delete and update CTA's only on your own recipe card(s).
![](./screenshots/recipe-card.png)

### Update your recipe
Review, improve, reiterate over your recipes.
![](./screenshots/update-preview.png)

## Roadmap
 * Implement upvotes and downvotes that are calculated into an overall score. Think of a relevant creative name for this "score"
 * Refactor code to follow a 'drier' approach using ejs includes.

## Environment
* macOS catalina: 10.15.3
* VS Code: 1.39.1

## Authors
* **Bruce Pouncey** - *Initial work* - [BPouncey](https://github.com/BPouncey)

## License
(MIT)

## Acknowledgments
[@GeneralAssembly](https://generalassemb.ly/)
