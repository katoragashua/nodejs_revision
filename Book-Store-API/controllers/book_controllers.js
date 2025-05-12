const Book = require("../models/Book.js");

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({ success: true, books });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single book by ID
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Please provide a book ID");
    const book = Book.findById(id);
    if (!book) res.status(404).json({ message: "Book not found" });
    return res.status(200).json({ success: true, book });
  } catch (error) {}
};

// Create a new book
const createBook = async (req, res) => {
  const { title, author, genre, year } = req.body;
  if (!title || !author || !genre || !year) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }
  try {
    const book = await Book.create({ title, author, genre, year });
    return res.status(201).json({ success: true, book });
  } catch (error) {
    console.error("Error creating book:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// // Update a book 
// // Use this approach if you need to work with the document in memory before saving.
// const updateBook = async (req, res) => {
//   const { id } = req.params;
//   if (!id) {
//     return res.status(400).json({ message: "Please provide a book ID" });
//   }
//   const { title, author, genre, year } = req.body;
//   if (!title && !author && !genre && !year) {
//     return res
//       .status(400)
//       .json({ message: "At least one field must be provided" });
//   }
//   try {
//     const book = await Book.findOne({ _id: id });
//     if (!book) {
//       return res.status(404).json({ message: "Book not found" });
//     }
//     if (title) book.title = title;
//     if (author) book.author = author;
//     if (genre) book.genre = genre;
//     if (year) book.year = year;
//     const updatedBook = await book.save();
//     return res.status(200).json({ success: true, book: updatedBook });
//   } catch (error) {
//     console.error("Error updating book:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// or
// Use this approach (findOneAndUpdate) for a more concise and efficient update operation.
const updateBook = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Please provide a book ID" });
    }
    const updates = req.body; // Contains the fields to update
    if (!updates || Object.keys(updates).length === 0) {
        return res.status(400).json({ message: "At least one field must be provided" });
    }
    try {
        const updatedBook = await Book.findOneAndUpdate({_id: id}, updates, {
            new: true, // Return the updated document
            runValidators: true, // Ensure validation rules are applied
        });
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json({ success: true, book: updatedBook });
    } catch (error) {
        console.error("Error updating book:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Delete a book by ID
const deleteBook = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Please provide a book ID" });
    }
    try {
        const book = await Book.findOneAndDelete({ _id: id });
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json({ success: true, message: "Book deleted successfully", book });
    } catch (error) {
        console.error("Error deleting book:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Export the controller functions
module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
