const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerConfig');
const auth = require('../middleware/auth');
const recipeController = require('../controllers/recipeController');

// Recipe routes
router.post('/', auth, upload.array('images', 20), recipeController.addRecipe);
router.get('/trending', recipeController.getTrendingRecipes);
router.get('/visit/:id', recipeController.visitRecipe);
router.get('/:id', recipeController.getRecipeById);
router.get('/random', recipeController.getRandomRecipes);
router.get('/popular', recipeController.getPopularRecipes);
router.get('/recent', recipeController.getRecentRecipes);

module.exports = router;
