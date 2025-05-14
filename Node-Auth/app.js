const express = require("express");
const app = express();
const authRouter = require("./routes/user_routes");
const { config } = require("dotenv");
config();

// Middlewares
app.use(express.json());

app.get("/", (req, res) => res.send("Welcome to our Auth Tutorial."));

// Routes
app.use("/api/v1/auth", authRouter);

module.exports = app;
