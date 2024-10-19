const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [3, 'Name must be at least 3 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false
    },
    role: {
        type: String,
        enum: ['admin', 'moderator'],
        default: 'admin'
    },
    isActive: {
        type: Boolean,
        default: true 
    }
}, { 
    timestamps: true
});

// // Hash password b4 save
// adminSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// // method decrypt passwords for login
// adminSchema.methods.comparePassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

// // method to deactivate the admin
// adminSchema.methods.deactivate = function () {
//     this.isActive = false;
//     return this.save();
// };

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;