const Order = require('../models/orderSchema')
const Product = require('../models/productSchema');
const Customer = require('../models/customerSchema');

exports.neworder = async (req, res) => {
    try {
        const { customerId, productId, status } = req.body;

        const product = await Product.findById(productId);
        const customer = await Customer.findById(customerId);
        if (!product || !customer) {
            return res.status(404).json({ message: 'Product or Customer not found' });
        }

        const newOrder = new Order({
            customerId,
            productId,
            status
        });

        const savedOrder = await newOrder.save();
        res.status(201).json({ message: 'Order placed successfully', Order: savedOrder });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all Orders
exports.getAllOrders = async (req, res) => {
    try {
        const Orders = await Order.find();
        res.status(200).json(Orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Order by CustomerID
exports.getOrderByCustomerId = async (req, res) => {
    try {
        const { customerId } = req.params;
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        
        const orders = await Order.find({ customerId: customerId });
        if (!orders.length) {
            return res.status(404).json({ message: 'No orders for this customer' });
        }
        res.status(200).json(orders);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Order by ID
exports.updateOrder = async (req, res) => {
    try {
        const updated = req.body;
        
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            updated,
            { new: true, runValidators: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order updated successfully', Order: updatedOrder });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete Order by ID
exports.deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};