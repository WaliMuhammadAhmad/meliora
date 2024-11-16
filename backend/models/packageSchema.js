const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    packageName: {
        type: String,
        required: [true, 'Package name is required'],
        trim: true,
        minlength: [3, 'Package name must be at least 3 characters long'],
        maxlength: [100, 'Package name must not exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minlength: [10, 'Description must be at least 10 characters long'],
        maxlength: [2500, 'Description must not exceed 2500 characters']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [1, 'Price must be greater than 0']
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        }
    ],
    isAvailable: {
        type: Boolean,
        default: true 
    }
}, {
    timestamps: true
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;