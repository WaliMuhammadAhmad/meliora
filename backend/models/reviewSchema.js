const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    stars: {
        type: Number,
        required: [true, 'Rating is required'],
        min: [1, 'Rating must be at least 1 star'],
        max: [5, 'Rating must be at most 5 stars']
    },
    review: {
        type: String,
        trim: true,
        required: [true, 'Review text is required'],
        minlength: [10, 'Review must be at least 10 characters long'],
        maxlength: [500, 'Review must not exceed 500 characters']
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
}, { 
    timestamps: true
});

reviewSchema.index({ customerId: 1, productId: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;