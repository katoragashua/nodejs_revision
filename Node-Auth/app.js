const express = require("express");
const app = express();
// const fileUpload = require("express-fileupload");
const authRouter = require("./routes/auth_routes");
const imageRouter = require("./routes/image_routes");

const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })
const userRouter = require("./routes/user_routes");

// Middlewares
app.use(express.json());
// app.use(fileUpload({ useTempFiles: true }));

app.get("/", (req, res) => res.send("Welcome to our Auth Tutorial."));
app.use(userRouter);

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/image", imageRouter);

module.exports = app;


