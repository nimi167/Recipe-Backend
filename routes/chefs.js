const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Chef routes
router.get('/all', recipeController.getAllChefsData);

module.exports = router;
