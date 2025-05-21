const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/auth_middleware");

router.get("/home", (req, res) => {
  res.send("Welcome to the home page");
});
router.get("/profile", authMiddleware, (req, res) => {
    const {username} = req.user;
  res.send(`<h1>Welcome to your profile page, ${username}</h1>`);
});


module.exports = router;