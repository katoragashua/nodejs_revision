const express = require("express");
const app = express();
const productRoutes = require("./routes/product_routes");
const authorsRoutes = require("./routes/author_routes");
const bookRoutes = require("./routes/book_routes");

// Middleware to parse JSON bodies
app.use(express.json());


app.use("/api/v1/products", productRoutes);
app.use("/api/v1/authors", authorsRoutes);
app.use("/api/v1/books", bookRoutes);
// Basic route for testing

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

module.exports = app;
