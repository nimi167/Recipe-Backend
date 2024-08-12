const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authController = require('../controllers/authController');

// Auth routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/google/signup', authController.googleSignup);
router.get('/get-user', auth, authController.getUser);

module.exports = router;
