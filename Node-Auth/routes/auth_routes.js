const express = require("express");
const router = express.Router();
const { registerUser, loginUser, changePassword } = require("../controllers/auth_controllers");
const { authenticationMiddleware, authorizationMiddleware } = require("../middlewares/auth_middleware")
// Register route
router.post("/register", registerUser);
// Login route
router.post("/login", loginUser);
// Change Password
router.post("/change-password", authenticationMiddleware, changePassword)

module.exports = router;
// This code defines a route for user registration in an Express application.
