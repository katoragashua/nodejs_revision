const data = require("../data.json");
const Product = require("../models/Product");

const addProducts = async (req, res) => {
  try {
    const products = await Product.insertMany(data);
    const numofProducts = products.length;
    res.status(201).json({
      message: "Products added successfully",
      numofProducts: numofProducts,
      products: products,
    });
  } catch (error) {
    console.error("Error adding products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const stats = async (req, res) => {
  try {
    const stats = await Product.aggregate([
      // stage 1
      {
        $match: {
          inStock: true,
        },
      },
      // stage 2
      {
        $group: {
          _id: "$category",
          avgPrice: { $avg: "$price" },
          total: { $sum: 1 },
          maxPrice: { $max: "$price" },
        },
      },
    ]);
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addProducts,
  stats,
};
