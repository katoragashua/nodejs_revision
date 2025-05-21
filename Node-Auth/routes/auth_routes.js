const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/auth_controllers");

// Register route
router.post("/register", registerUser);
// Login route
router.post("/login", loginUser);

module.exports = router;
// This code defines a route for user registration in an Express application.
