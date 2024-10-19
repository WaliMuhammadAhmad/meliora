const Customer = require('../models/customerSchema'); // Adjust the path as necessary
// const bcrypt = require('bcryptjs'); // Uncomment this when you are ready to implement password hashing

// Create a new customer
exports.createCustomer = async (req, res) => {
    try {
        const { name, email, password, cardPayment, cashOnDelivery } = req.body;

        // Hash the password before saving (uncomment when ready)
        // const saltRounds = 10;
        // const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newCustomer = new Customer({
            name,
            email,
            password, // Use hashedPassword here when ready
            cardPayment,
            cashOnDelivery
        });

        const savedCustomer = await newCustomer.save();
        res.status(201).json({ message: 'Customer created successfully', customer: savedCustomer });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all customers
exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().populate('reviews').populate('carts');
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get customer by ID
exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id).populate('reviews').populate('carts');
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update customer by ID
exports.updateCustomer = async (req, res) => {
    try {
        const { name, email, password, cardPayment, cashOnDelivery } = req.body;

        // Hash the password if it's being updated (uncomment when ready)
        // const saltRounds = 10;
        // const hashedPassword = await bcrypt.hash(password, saltRounds);

        const updatedCustomer = await Customer.findByIdAndUpdate(
            req.params.id,
            {
                name,
                email,
                // password: hashedPassword, // Uncomment this when ready to use hashed password
                cardPayment,
                cashOnDelivery
            },
            { new: true }
        );

        if (!updatedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({ message: 'Customer updated successfully', customer: updatedCustomer });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete customer by ID
exports.deleteCustomer = async (req, res) => {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        if (!deletedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Example of password comparison (to be uncommented when ready)
// const isPasswordValid = await bcrypt.compare(req.body.password, customer.password);
// if (!isPasswordValid) {
//     return res.status(401).json({ message: 'Invalid credentials' });
// }