const {Schema, default: mongoose} = require('mongoose');
const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    inStock: {
        type:  Boolean,
        required: true,
        default: true
    },
    tags: {
        type: [String],
        default: []
    },
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
// This code defines a Mongoose schema and model for a Product entity.