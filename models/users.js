const  mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: String,
  time: String,
  Details: String,
  upvotes: Number,
  downvotes: Number,
}, {
  timestamps: true
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  recipes: [recipeSchema],
  googleId: String
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema)
module.exports = mongoose.model('Recipe', recipeSchema)