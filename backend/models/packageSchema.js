const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    packageName: String,
    description: String,
    price: Number,
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

const Package = new mongoose.model('Package', packageSchema);

module.exports = Package;