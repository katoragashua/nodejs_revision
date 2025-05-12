const { Schema, default: mongoose } = require("mongoose");
const bookSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    maxLenghth: [50, "Title cannot exceed 50 characters"],
  },
  author: {
    type: String,
    required: [true, "Author is required"],
    trim: true,
    maxLength: [50, "Author cannot exceed 50 characters"],
  },
    genre: {
        type: String,
        required: [true, "Genre is required"],
        trim: true,
        maxLength: [30, "Genre cannot exceed 30 characters"],
    },
    year: {
        type: Number,
        required: [true, "Publication Year is required"],
        min: [1000, "Year must be after 1000"],
        max: [new Date().getFullYear(), "Year cannot be in the future"],
        index: true,
        validate: {
            validator: function (value) {
                return Number.isInteger(value); // Ensure it's an integer
            },
            message: "Year must be a valid integer",
        },
    },

}, { timestamps: true });

// Create a compound index on title and author
bookSchema.index({ title: 1, author: 1 }, { unique: true });


const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
