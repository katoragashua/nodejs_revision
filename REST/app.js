const express = require("express");
const app = express();
const books = require("./books.json");
const fs = require("node:fs/promises");
const path = require("node:path");
// const { v4: uuidv4 } = require("uuid");

// Middleware to parse JSON bodies
app.use(express.json());

// Home route
// GET /
app.get("/", (req, res) => {
  res.send("Welcome to our Bookstore API!");
});

// Endpoint to get a list of all books
// GET /books
app.get("/books", (req, res) => {
  res.json(books);
});

// Endpoint to get a book by ID i.e Single book
// GET /books/:id
app.get("/books/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((book) => book.id === Number(id));
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  return res.json(book);
});

app.post("/books", (req, res) => {
  const { title, author, genre } = req.body;
  if (!title || !author || !genre) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const newBook = {
    id: books.length + 1,
    title,
    author,
    genre,
  };
  books.push(newBook);
  // fs.writeFile(path.join(__dirname, "books.json"), JSON.stringify(books, null, 2))
  //     .then(() => {
  //         console.log("File written successfully");
  //     })
  //     .catch((err) => {
  //         console.error(err);
  //     });

  const fileHandle = fs.open(path.join(__dirname, "books.json"), "w+");
  fileHandle
    .then((handle) => {
      handle.writeFile(JSON.stringify(books, null, 2));
      handle.close();
    })
    .catch((err) => {
      console.error(err);
    });
  return res.status(201).json(book);
});

// Endpoint to update a book by ID
// PUT /books/:id
app.put("/books/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, genre } = req.body;

  // Validate request body
  if (!title && !author && !genre) {
    return res.status(400).json({ message: "At least one field is required" });
  }

 // Find the book by ID
 const bookIndex = books.findIndex((book) => book.id === Number(id));
 if (bookIndex === -1) {
   return res.status(404).json({ message: "Book not found" });
 }

 // Update the book
 const updatedBook = {
   ...books[bookIndex],
   title: title || books[bookIndex].title,
   author: author || books[bookIndex].author,
   genre: genre || books[bookIndex].genre,
 };
 books[bookIndex] = updatedBook;

 // Write the updated books array to the file
 try {
   await fs.writeFile(
     path.join(__dirname, "books.json"),
     JSON.stringify(books, null, 2)
   );
   console.log("Books file updated successfully");
 } catch (error) {
   console.error("Error writing to books.json:", error);
   return res.status(500).json({ message: "Failed to update the book" });
 }

 // Respond with the updated book
 return res.status(200).json(updatedBook);
});

// Endpoint to delete a book by ID
// DELETE /books/:id
app.delete("/books/:id", async (req, res) => {
  const { id } = req.params;

  // Find the book by ID
  const bookIndex = books.findIndex((book) => book.id === Number(id));
  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  // Remove the book from the array
  const deletedBook = books.splice(bookIndex, 1)[0];

  // Write the updated books array to the file
  try {
    await fs.writeFile(
      path.join(__dirname, "books.json"),
      JSON.stringify(books, null, 2)
    );
    console.log("Books file updated successfully");
  } catch (error) {
    console.error("Error writing to books.json:", error);
    return res.status(500).json({ message: "Failed to delete the book" });
  }

  // Respond with the deleted book
  return res.status(200).json({ message: "Book deleted successfully", deletedBook });
});

module.exports = app;
