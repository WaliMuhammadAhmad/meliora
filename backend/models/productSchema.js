const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image:String,
    name:String,
    description:String,
    price:int,
    size:int

})

const Product = new mongoose.model('Product', productSchema);

module.exports = UsProducter;