const { createServer } = require("node:http");
const app = require("./app.js");
const port = process.env.PORT || 3000;

const server = createServer(app);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
