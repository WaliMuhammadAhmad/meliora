const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    cardPayment:String,
    cashOnDelivery:String,
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ]

})

const  Customer = new mongoose.model('Customer', customerSchema);

module.exports = Customer;