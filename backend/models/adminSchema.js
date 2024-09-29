const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
   name:String,
   password:String,
   level:String
})

const Admin = new mongoose.model('Admin', adminSchema);

module.exports = Admin;