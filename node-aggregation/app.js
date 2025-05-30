const express = require("express");
const app = express();
const productRoutes = require("./routes/product_routes");

// Middleware to parse JSON bodies
app.use(express.json());


app.use("/api/v1/products", productRoutes);
// Basic route for testing

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

module.exports = app;
