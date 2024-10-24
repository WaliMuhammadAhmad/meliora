require("dotenv").config();
const mongoose = require("mongoose");
const Customer = require("./models/customerSchema");
const Admin = require("./models/adminSchema");
const Product = require("./models/productSchema");
const Review = require("./models/reviewSchema");
const Package = require("./models/packageSchema");
const Order = require("./models/orderSchema");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {

    // Insert customers
    const customers = await Customer.insertMany([
      {
        name: "Ahmed Khan",
        email: "ahmedkhan@example.com",
        password: "AhmedSecret789",
        phone: "1122334455",
        address: {
          house: "789",
          street: "Gulberg",
          city: "Islamabad",
          state: "Islamabad Capital Territory",
          postalCode: "44000",
          country: "Pakistan",
        },
        deliveryAddress: "Same as address",
        paymentMethods: {
          cashOnDelivery: true,
          cardPayment: {
            cardNumber: null,
            expiryDate: null,
            cvv: null,
            nameOnCard: null,
            billingAddress: null,
            default: false,
          },
        },
        isVerified: true,
      },
    ]);

    // Insert admins
    const admins = await Admin.insertMany([
      {
        name: "Labeeb",
        email: "m.labeeb@example.com",
        password: "password123",
        role: "admin",
        isActive: false,
      },
    ]);

    // Insert products
    const products = await Product.insertMany([
      {
        name: "Meliora All-Purpose Cleaner",
        description: "A powerful all-purpose cleaner that cuts through grease and grime, leaving surfaces sparkling clean.",
        price: 12.99,
        size: "Medium",
        quantity: "500ml",
        frontImage: "https://example.com/images/all-purpose-cleaner-front.jpg",
        backImage: "https://example.com/images/all-purpose-cleaner-back.jpg",
        stockQuantity: 150,
      },
      {
        name: "Meliora Glass Cleaner",
        description: "A streak-free glass cleaner that provides a brilliant shine to all glass surfaces.",
        price: 9.99,
        size: "Small",
        quantity: "250ml",
        frontImage: "https://example.com/images/glass-cleaner-front.jpg",
        backImage: "https://example.com/images/glass-cleaner-back.jpg",
        stockQuantity: 100,
      },
      {
        name: "Meliora Heavy-Duty Degreaser",
        description: "An industrial-strength degreaser designed for tough cleaning jobs in kitchens and garages.",
        price: 19.99,
        size: "Large",
        quantity: "1L",
        frontImage: "https://example.com/images/heavy-duty-degreaser-front.jpg",
        backImage: "https://example.com/images/heavy-duty-degreaser-back.jpg",
        stockQuantity: 80,
      },
      {
        name: "Meliora Bathroom Cleaner",
        description: "A specialized cleaner that removes soap scum and hard water stains, keeping your bathroom fresh.",
        price: 10.50,
        size: "Medium",
        quantity: "500ml",
        frontImage: "https://example.com/images/bathroom-cleaner-front.jpg",
        backImage: "https://example.com/images/bathroom-cleaner-back.jpg",
        stockQuantity: 200,
      },
      {
        name: "Meliora Floor Cleaner",
        description: "A concentrated formula for cleaning all types of floors, leaving them shiny and fresh.",
        price: 15.75,
        size: "Large",
        quantity: "1L",
        frontImage: "https://example.com/images/floor-cleaner-front.jpg",
        backImage: "https://example.com/images/floor-cleaner-back.jpg",
        stockQuantity: 120,
      },
    ]);

    // Insert reviews
    const reviews = await Review.insertMany([
      {
        stars: 5,
        review: "This is an excellent product. Highly recommend!",
        customerId: customers[0]._id,
        productId: products[0]._id,
      },
      {
        stars: 4,
        review: "Good product but a little expensive.",
        customerId: customers[1]._id,
        productId: products[1]._id,
      },
    ]);

    // Insert packages
    const pkg = await Package.insertMany([
      {
        packageName: "Starter Package",
        description: "A starter package for new customers with essential products.",
        price: 99.99,
        products: [products[0]._id, products[1]._id],
        isAvailable: true,
      },
    ]);

    // Insert orders
    const orders = await Order.insertMany([
      {
        customerId: customers[0]._id,
        productId: products[0]._id,
        status: "pending",
      },
      {
        customerId: customers[0]._id,
        productId: products[0]._id,
        status: "delivered",
      },
      {
        customerId: customers[1]._id,
        productId: products[1]._id,
        status: "completed",
      },
      {
        customerId: customers[1]._id,
        productId: products[1]._id,
        status: "cancelled",
      },
    ]);

    console.log("Dummy data seeded");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

const runSeeder = async () => {
  await connectDB();
  await seedData();
  mongoose.connection.close();
};

module.exports = { runSeeder };