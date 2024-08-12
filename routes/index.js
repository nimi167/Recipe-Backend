const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const recipeRoutes = require('./recipes');
const chefRoutes = require('./chefs');

// Home route
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

// Use other routes
router.use('/auth', authRoutes);
router.use('/api/recipes', recipeRoutes);
router.use('/chefs', chefRoutes);

module.exports = router;





// const express = require('express');
// const router = express.Router();
// const upload = require('../middleware/multerConfig');
// const auth = require('../middleware/auth');
// const authController = require('../controllers/authController');
// const recipeController = require('../controllers/recipeController');

// // Home route
// router.get('/', (req, res) => {
//   res.render('index', { title: 'Express' });
// });

// // Auth routes
// router.post('/signup', authController.signup);
// router.post('/login', authController.login);
// router.post('/google/signup', authController.googleSignup);
// router.get('/auth/get-user', auth, authController.getUser);

// // Recipe routes
// router.post('/api/recipes', auth, upload.array('images', 20), recipeController.addRecipe);
// router.get('/get/trending/recipes', recipeController.getTrendingRecipes);
// router.get('/visite/recipe/:id', recipeController.visitRecipe);
// router.get('/get/recipes/:id', recipeController.getRecipeById);
// router.get('/get/random/recipes', recipeController.getRandomRecipes);
// router.get('/get/popular/recipes', recipeController.getPopularRecipes);
// router.get('/get/recent/recipes', recipeController.getRecentRecipes);

// // Chef routes
// router.get('/get/all/chefs/data', recipeController.getAllChefsData);

// module.exports = router;
