const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: [true, 'Customer ID is required'],
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product ID is required'],
    },
    status: {
        type: String,
        default: 'pending',
        enum: {
            values: ['pending', 'delivered','completed', 'cancelled'],
            message: '{VALUE} is not a valid order status'
        },
        trim: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    versionKey: false // Disabling the "__v" version key
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;