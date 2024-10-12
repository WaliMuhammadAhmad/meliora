const Customer = require('../models/customerSchema')
const Admin = require('../models/adminSchema')
const Product = require('../models/productSchema')
const Package = require('../models/packageSchema')
const Review = require('../models/reviewSchema')

const loginCustomer = (req, res) => {
    const { email, password } = req.body;
    Customer.findOne({ email: email }).then((customer, err) => {
        if (customer) {
            if (password === customer.password) {
                res.send({ message: 'Login Successfull' });
            }
            else {
                res.send({ message: 'Wrong Password' });
            }
        }
        else {
            res.send({ message: 'Customer Not Found' });
        }
    })
}

const registerCustomer = (req, res) => {
    Customer.findOne({ email: req.body.email }).then((customer, err) => {
        if (customer) {
            res.send({ message: "Account Already Registered" });
        }
        else {
            const customer = new Customer(req.body);
            customer.save().then((customer, err) => {
                if (customer) {
                    res.send({ message: "Account Created Succesfully" })
                }
                else {
                    console.log(err);
                }
            })
        }
    })
}
const loginAdmin = (req, res) => {
    const { email, password } = req.body;
    Admin.findOne({ email: email }).then((admin, err) => {
        if (admin) {
            if (password === admin.password) {
                res.send({ message: 'Login Successfull' });
            }
            else {
                res.send({ message: 'Wrong Password' });
            }
        }
        else {
            res.send({ message: 'Admin Not Found' });
        }
    })
}

const registerAdmin = (req, res) => {
    Admin.findOne({ email: req.body.email }).then((admin, err) => {
        if (admin) {
            res.send({ message: "Account Already Registered" });
        }
        else {
            const admin = new Admin(req.body);
            admin.save().then((admin, err) => {
                if (admin) {
                    res.send({ message: "Account Created Succesfully" })
                }
                else {
                    console.log(err);
                }
            })
        }
    })
}

const addToCart = async (req, res) => {
    let { productId } = req.body;
    // console.log(productId);
    try {
        const customer = await Customer.findOne({ _id: req.params.id });
        if (customer.carts.includes(productId)) {
            res.send({ message: "Already Added" })
        }
        else {
            customer.carts.push(productId);
            await customer.save();
            res.send({ message: "Added to Cart" })
        }
    } catch (err) {
        console.log(err);
    }
}

const deleteCart = async (req, res) => {
    let { productId } = req.body;
    try {
        const customer = await Customer.findOne({ _id: req.params.id });
        const index = customer.carts.indexOf(productId);
        if (index !== -1) {
            customer.carts.splice(index, 1);
            await customer.save();
            res.send({ message: "Product Deleted from Cart" })
        }
    } catch (err) {
        console.log(err);
    }

}

const review = async (req, res) => {
    try {
        const customer = await Customer.findOne({ _id: req.params.id });
        const review = new Review(req.body);
        review.save().then(async (review, err) => {
            if (review) {
                customer.reviews.push(review._id);
                await customer.save();
                res.send({ message: "Review Added Successfully" })
            }
        })
    } catch (error) {
        console.log(error.message);

    }
}

module.exports = { loginCustomer, registerCustomer, loginAdmin, registerAdmin, addToCart, deleteCart, review }