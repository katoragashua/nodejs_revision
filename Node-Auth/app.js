const express = require("express");
const app = express();
const authRouter = require("./routes/auth_routes");
const { config } = require("dotenv");
config();
const userRouter = require("./routes/user_routes");

// Middlewares
app.use(express.json());

app.get("/", (req, res) => res.send("Welcome to our Auth Tutorial."));
app.use(userRouter);

// Routes
app.use("/api/v1/auth", authRouter);

module.exports = app;
