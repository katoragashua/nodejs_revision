const express = require("express");
const router = express.Router();
const { authenticationMiddleware, authorizationMiddleware } = require("../middlewares/auth_middleware");

router.get("/home", (req, res) => {
  res.send("Welcome to the home page");
});
router.get("/profile", authenticationMiddleware, (req, res) => {
    const {username} = req.user;
  res.send(`<h1>Welcome to your profile page, ${username}</h1>`);
});

router.get("/admin", authenticationMiddleware, authorizationMiddleware("admin"), (req, res) => {
  res.send("<h1>Welcome to the admin page</h1>");
});


module.exports = router;