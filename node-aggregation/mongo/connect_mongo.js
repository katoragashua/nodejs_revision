const mongoose = require("mongoose");

const connectMongo = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
    // Optionally, you can set mongoose options here
    // mongoose.set('strictQuery', false); // Example option, adjust as needed
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

const disconnectMongo = async () => {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.error("MongoDB disconnection error:", error);
    throw error;
  }
}

module.exports = {
  connectMongo,
  disconnectMongo
};