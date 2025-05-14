const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/user_controllers');

// Register route
router.post('/register', registerUser);

module.exports = router;
// This code defines a route for user registration in an Express application.