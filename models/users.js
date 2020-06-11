const  mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  text: String,
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

module.exports = mongoose.model('User', userSchema);