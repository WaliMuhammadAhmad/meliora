const Admin = require('../models/adminSchema');
const bcrypt = require('bcrypt');

exports.createAdmin = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const newAdmin = new Admin({
            name,
            email,
            password,
            role
        });

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
        const { name, email, password } = req.body;

        const updateData = {
            name,
            email,
        };

        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const updatedAdmin = await Admin.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
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