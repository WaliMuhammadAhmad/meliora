const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: String,
    name: String,
    description: String,
    price: Number,
    size: Number

})

const Product = new mongoose.model('Product', productSchema);

module.exports = Product;