const Admin = require('../models/adminSchema'); // Adjust the path as necessary

// Create a new admin
exports.createAdmin = async (req, res) => {
    try {
        const { name, email, password, level } = req.body;

        // Create new admin instance (password hashing should be implemented here)
        const newAdmin = new Admin({
            name,
            email,
            password,
            level
        });

        // Save admin to database
        const savedAdmin = await newAdmin.save();
        res.status(201).json({ message: 'Admin created successfully', admin: savedAdmin });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all admins
exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get admin by ID
exports.getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update admin by ID
exports.updateAdmin = async (req, res) => {
    try {
        const { name, email, password, level } = req.body;

        // Find admin and update fields (password hashing should be implemented here)
        const updatedAdmin = await Admin.findByIdAndUpdate(
            req.params.id,
            {
                name,
                email,
                level,
                // password // Uncomment and handle bcrypt hashing when ready
            },
            { new: true }
        );

        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.status(200).json({ message: 'Admin updated successfully', admin: updatedAdmin });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete admin by ID
exports.deleteAdmin = async (req, res) => {
    try {
        const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
        if (!deletedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Password hashing example (to be uncommented when ready)
// const bcrypt = require('bcryptjs');
// const saltRounds = 10;
// newAdmin.password = await bcrypt.hash(password, saltRounds);
// updatedAdmin.password = await bcrypt.hash(password, saltRounds);