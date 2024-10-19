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
        type: Number,
        required: [true, 'Size is required'],
        min: [1, 'Size must be a positive number']
    },
    image: {
        type: String,
        required: [true, 'Product image URL is required'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Chemicals', 'Industrial', 'Cleaning', 'Other'],
        default: 'Chemicals'
    },
    stockQuantity: {
        type: Number,
        required: [true, 'Stock quantity is required'],
        min: [0, 'Stock quantity cannot be negative'],
        default: 0
    },
    ratings: {
        average: {
            type: Number,
            default: 0,
            min: [0, 'Rating must be at least 0'],
            max: [5, 'Rating must be at most 5']
        },
        totalReviews: {
            type: Number,
            default: 0,
            min: [0, 'Total reviews cannot be negative']
        }
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, { 
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;