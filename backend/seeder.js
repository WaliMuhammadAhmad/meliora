require("dotenv").config();
const bcrypt = require("bcrypt");
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
  // Clear existing collections
  await Promise.all([
    Customer.deleteMany({}),
    Admin.deleteMany({}),
    Product.deleteMany({}),
    Review.deleteMany({}),
    Package.deleteMany({}),
  ]);

  const customers = await Customer.insertMany([
    {
      name: "John Doe",
      email: "johndoe@example.com",
      password: await bcrypt.hash("password123", 10),
      phone: "1234567890",
      address: {
        house: "101",
        street: "Main Street",
        city: "New York",
        state: "NY",
        postalCode: "10001",
        country: "USA",
      },
      paymentMethods: {
        cardPayment: {
          cardNumber: "4111111111111111",
          expiryDate: "12/25",
          cvv: "123",
          nameOnCard: "John Doe",
          billingAddress: "101 Main Street, New York, NY, 10001",
          default: true,
        },
        cashOnDelivery: true,
      },
      isVerified: true,
    },
    {
      name: "Jane Smith",
      email: "janesmith@example.com",
      password: await bcrypt.hash("password456", 10),
      phone: "0987654321",
      address: {
        house: "202",
        street: "Second Avenue",
        city: "Los Angeles",
        state: "CA",
        postalCode: "90001",
        country: "USA",
      },
      paymentMethods: {
        cardPayment: {
          cardNumber: "4242424242424242",
          expiryDate: "11/24",
          cvv: "456",
          nameOnCard: "Jane Smith",
          billingAddress: "202 Second Avenue, Los Angeles, CA, 90001",
          default: false,
        },
        cashOnDelivery: false,
      },
      isVerified: false,
    },
  ]);

  const admins = await Admin.insertMany([
    {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      password: await bcrypt.hash("password123", 10),
      role: "admin",
      isActive: true,
    },
    {
      name: "Bob Smith",
      email: "bob.smith@example.com",
      password: await bcrypt.hash("another@password123", 10),
      role: "moderator",
      isActive: false,
    },
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
      isFeatured: true,
    },
    {
      name: "Industrial Cleaner",
      description: "An industrial-grade cleaner for tough jobs.",
      price: 49.99,
      size: 500,
      image: "https://example.com/product-b.jpg",
      category: "Cleaning",
      stockQuantity: 50,
    },
  ]);

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

  const pkg = await Package.insertMany([
    {
      packageName: "Starter Package",
      description:
        "A starter package for new customers with essential products.",
      price: 99.99,
      products: [products[0]._id, products[1]._id],
      isAvailable: true,
    },
  ]);

  const order = await Order.insertMany([
    {
      customerId: '6714028cb590524754829a4f',
      productId: '6714028cb590524754829a55',
      status: 'pending',
    },
    {
      customerId: '6714028cb590524754829a4f',
      productId: '6714028cb590524754829a55',
      status: 'delivered',
    },
    {
      customerId: '6714028cb590524754829a4f',
      productId: '6714028cb590524754829a55',
      status: 'completed',
    },
    {
      customerId: '6714028cb590524754829a4f',
      productId: '6714028cb590524754829a55',
      status: 'cancelled',
    }
  ]);

  console.log("Dummy data seeded successfully");
};

const runSeeder = async () => {
  await connectDB();
  await seedData();
  mongoose.connection.close();
};

module.exports = { runSeeder };