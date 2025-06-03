const {Schema, default: mongoose} = require('mongoose');

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author', // Assuming you have an Author model
        required: true,
    },
})

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;