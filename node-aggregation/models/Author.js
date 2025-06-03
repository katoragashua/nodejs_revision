const {Schema, default: mongoose} = require('mongoose');

const authorSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    bio: {
        type: String,
        required: true,
        trim: true
    },
})

const Author = mongoose.model('Author', authorSchema);
module.exports = Author;