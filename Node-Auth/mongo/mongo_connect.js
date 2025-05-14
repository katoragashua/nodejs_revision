const { connect } = require("mongoose");

const connectDB = async (URI) => {
  try {
    await connect(URI);
    console.log("Connection to MongoDB successful.");
  } catch (error) {
    console.error("Connection to MongoDB failed", error);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
};
