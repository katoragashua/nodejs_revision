const { createServer } = require("node:http");
const { config } = require("dotenv");
const app = require("./app");
const { connectDB } = require("./mongo/mongo_connect");

config();
const PORT = process.env.PORT || 3000;

const server = createServer();

server.on("request", app);

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
