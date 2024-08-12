var mongoose = require('mongoose')
const recipeSchema = new mongoose.Schema({
  chefId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  Author: String,
  title: String,
  images: [String],
  description: String,
  ingredients: [String],
  instruction: [String],
  servings: String,
  cookingTime: {
    hrs: Number,
    min: Number
  },
  prepTime: {
    hrs: Number,
    min: Number
  },
  cuisine: String,
  collections: String,
  visitor: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  Rating: Number
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
