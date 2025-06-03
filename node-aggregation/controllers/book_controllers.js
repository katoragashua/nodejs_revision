const Book = require("../models/Book");

const addBook = async (req, res) => {
  try {
    // Assuming req.body contains the book data
    const bookData = req.body;
    // Create a new book instance
    const book = new Book(bookData);
    // Save the book to the database
    await book.save();
    // Respond with success message and book data
    res.status(201).json({
      success: true,
      message: "Book added successfully",
      book,
    });
  } catch (error) {
    console.error("Error adding books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getBook = async (req, res) => {
  try {
    // Assuming req.params.id contains the book ID
    const bookId = req.params.id;
    // Find the book by ID
    const book = await Book.findById(bookId).select("-__v").populate("author", "-__v -_id"); // Populate author details, excluding __v and _id fields  
    // If book not found, return 404
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    // Respond with the book data
    res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addBook,
    getBook,
};
