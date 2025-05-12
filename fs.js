const fs = require("fs");
const path = require("path");

const dataFile = fs.writeFileSync(
    path.join(__dirname, "text.txt"),
    "Hello World!"
  );
  const data = fs.readFileSync(path.join(__dirname, "text.txt"), "utf-8");
  console.log(data); // Outputs: Hello World!
  
  fs.writeFile("input.txt", "Wake me up when it's all over.", (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
    console.log("File written successfully!");
    fs.readFile("input.txt", "utf-8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return;
      }
      console.log("File content:", data);
    }); // Asynchronous read
  }); // Asynchronous write