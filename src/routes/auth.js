const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth');
const { verifyToken } = require('../middleware/auth');

// Register new user
router.post('/register', AuthController.register);

// Login user
router.post('/login', AuthController.login);

// Get user profile (protected route)
router.get('/profile', verifyToken, AuthController.getProfile);

module.exports = router; 