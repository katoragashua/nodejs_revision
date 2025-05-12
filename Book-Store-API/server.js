const { createServer } = require("node:http");
require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const { connectDB } = require("./database/mongo_connect");

const PORT = process.env.PORT || 3000;
const server = createServer();
server.on("request", app);

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();
