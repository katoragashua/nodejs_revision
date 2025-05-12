const { createServer } = require("http");

// const server = createServer();

// Creating a server using the createServer method with an event listener
/**
 server.on("request", (req, res) => {

  res.setHeader("Content-Type", "text/html");
  res.write("<h1>Hello World!</h1>");
  res.write("<p>This is a simple Node.js server.</p>");
  res.end();
});
 */

// Another way to create a server using the createServer method directly
const server = createServer((req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.write("<h1>Hello World!</h1>");
    res.write("<p>This is a simple Node.js server.</p>");
    res.end();
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});