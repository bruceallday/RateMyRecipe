const  mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  text: String
}, {
  timestamps: true
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatar: String,
  recipes: [recipeSchema],
  googleId: String
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);