require('dotenv').config();
const mongoose = require('mongoose');
const Customer = require('./models/customerSchema');
const Admin = require('./models/adminSchema');
const Product = require('./models/productSchema');
const Review = require('./models/reviewSchema');
const Package = require('./models/packageSchema');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const seedData = async () => {
    // Clear existing collections
    await Promise.all([
        Customer.deleteMany({}),
        Admin.deleteMany({}),
        Product.deleteMany({}),
        Review.deleteMany({}),
        Package.deleteMany({})
    ]);

    // Insert dummy data
    const customers = await Customer.insertMany([
        {
            name: "John Doe",
            email: "john.doe@example.com",
            password: "password123",
            phone: "1234567890",
            address: {
                street: "123 Main St",
                city: "New York",
                state: "NY",
                postalCode: "10001",
                country: "USA"
            },
            paymentMethods: {
                cardPayment: {
                    cardNumber: "4111111111111111",
                    expiryDate: "12/25",
                    cvv: "123",
                    nameOnCard: "John Doe",
                    billingAddress: "123 Main St, New York, NY, 10001"
                },
                cashOnDelivery: true
            },
            isVerified: true
        },
        {
            name: "Jane Smith",
            email: "jane.smith@example.com",
            password: "password456",
            phone: "0987654321",
            address: {
                street: "456 Elm St",
                city: "Los Angeles",
                state: "CA",
                postalCode: "90001",
                country: "USA"
            },
            paymentMethods: {
                cardPayment: {
                    cardNumber: "4222222222222",
                    expiryDate: "01/26",
                    cvv: "456",
                    nameOnCard: "Jane Smith",
                    billingAddress: "456 Elm St, Los Angeles, CA, 90001"
                },
                cashOnDelivery: true
            },
            isVerified: true
        }
    ]);

    const admins = await Admin.insertMany([
        {
            name: "Alice Johnson",
            email: "alice.johnson@example.com",
            password: "securePassword123",
            role: "admin",
            isActive: true
        },
        {
            name: "Bob Smith",
            email: "bob.smith@example.com",
            password: "anotherPassword456",
            role: "moderator",
            isActive: false
        }
    ]);

    const products = await Product.insertMany([
        {
            name: "Chemical A",
            description: "A high-quality chemical for industrial use.",
            price: 29.99,
            size: 1000,
            image: "https://example.com/product-a.jpg",
            category: "Chemicals",
            stockQuantity: 100,
            isFeatured: true
        },
        {
            name: "Industrial Cleaner",
            description: "An industrial-grade cleaner for tough jobs.",
            price: 49.99,
            size: 500,
            image: "https://example.com/product-b.jpg",
            category: "Cleaning",
            stockQuantity: 50
        }
    ]);

    const reviews = await Review.insertMany([
        {
            stars: 5,
            review: "This is an excellent product. Highly recommend!",
            customerId: customers[0]._id,
            productId: products[0]._id
        },
        {
            stars: 4,
            review: "Good product but a little expensive.",
            customerId: customers[1]._id,
            productId: products[1]._id
        }
    ]);

    const pkg = await Package.insertMany([
        {
            packageName: "Starter Package",
            description: "A starter package for new customers with essential products.",
            price: 99.99,
            products: [products[0]._id, products[1]._id],
            isAvailable: true
        }
    ]);

    console.log('Dummy data seeded successfully');
};

const runSeeder = async () => {
    await connectDB();
    await seedData();
    mongoose.connection.close();
};

module.exports = { runSeeder };