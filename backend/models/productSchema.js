const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        minlength: [3, 'Product name must be at least 3 characters long'],
        maxlength: [100, 'Product name must not exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        trim: true,
        minlength: [10, 'Description must be at least 10 characters long']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price must be greater than or equal to 0']
    },
    size: {
        type: String,
        required: [true, 'Size is required'],
        enum: ['Small','Medium','Large','XL','Other']
    },
    quantity: {
        type: String,
        required: [true, "Product Quantity is required"],
        default: "250ml",
    },
    frontImage: {
        type: String,
        required: [true, 'Product image URL is required'],
        trim: true
    },
    backImage: {
        type: String,
        required: [true, 'Product image URL is required'],
        trim: true
    },
    stockQuantity: {
        type: Number,
        required: [true, 'Stock quantity is required'],
        min: [0, 'Stock quantity cannot be negative'],
        default: 0
    }
}, { 
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;