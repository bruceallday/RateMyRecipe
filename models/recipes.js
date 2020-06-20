const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: String,
  time: String,
  description: String,
  username: String,
  upvotes: [],
  downvotes: [],
}, {
  timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema);