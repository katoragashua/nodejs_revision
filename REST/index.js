const { createServer } = require("node:http");
const server = createServer();
const app = require("./app.js");
const port = process.env.PORT || 3000;

server.on("request", app);

server.listen(3000, () => {
  console.log(`Server is running on port ${port}`);
});
