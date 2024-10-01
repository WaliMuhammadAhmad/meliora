const mongoose = require = ('mongoose')

const reviewSchema = new mongoose.Schema({
    stars: int,
    review: String,
    customerId: mongoose.Schema.Types.ObjectId,
    productId: mongoose.Schema.Types.ObjectId
})

const Review = new mongoose.model('Review', reviewSchema);

module.exports = Review;