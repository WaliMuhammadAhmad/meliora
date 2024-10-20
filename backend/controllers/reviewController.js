const Review = require('../models/reviewSchema'); // Adjust the path as necessary
const Product = require('../models/productSchema'); // Assuming you have a Product model for product reference
const Customer = require('../models/customerSchema'); // Assuming you have a Customer model for customer reference

// Create a new review
exports.createReview = async (req, res) => {
    try {
        const { stars, review, customerId, productId } = req.body;

        // Validate that the product and customer exist
        const product = await Product.findById(productId);
        const customer = await Customer.findById(customerId);
        if (!product || !customer) {
            return res.status(404).json({ message: 'Product or Customer not found' });
        }

        const newReview = new Review({
            stars,
            review,
            customerId,
            productId
        });

        const savedReview = await newReview.save();
        res.status(201).json({ message: 'Review created successfully', review: savedReview });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all reviews
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('customerId').populate('productId'); // Populate customer and product info
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get review by ID
exports.getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id).populate('customerId').populate('productId');
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update review by ID
exports.updateReview = async (req, res) => {
    try {
        const { stars, review } = req.body;

        const updatedReview = await Review.findByIdAndUpdate(
            req.params.id,
            {
                stars,
                review
            },
            { new: true } // Returns the updated review
        );

        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json({ message: 'Review updated successfully', review: updatedReview });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete review by ID
exports.deleteReview = async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};