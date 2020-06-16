const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: String,
  time: String,
  description: String,
  username: String,
  upvotes: Number,
  downvotes: Number,
}, {
  timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema);