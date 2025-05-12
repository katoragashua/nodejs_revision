const express = require("express");
const app = express();
const {
  appMiddleware,
  homePageMiddleware,
  productsPageMiddleware,
  productDetailsPageMiddleware,
} = require("./middleware.js");
const products = [
  { id: 1, name: "Laptop", price: 1200, category: "Electronics" },
  { id: 2, name: "Smartphone", price: 800, category: "Electronics" },
  { id: 3, name: "Tablet", price: 500, category: "Electronics" },
  { id: 4, name: "Headphones", price: 150, category: "Accessories" },
  { id: 5, name: "Smartwatch", price: 200, category: "Wearables" },
];

// Middlewares
app.use(appMiddleware);
app.use("/", homePageMiddleware);
app.use("/products",productsPageMiddleware);
app.use("/products/:id", productDetailsPageMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to our home page");
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Product ID is required" });
  }
  const product = products.find((product) => product.id === Number(id));
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  return res.json(product);
});

module.exports = app;
