const Order = require("../models/orderSchema");
const Product = require("../models/productSchema");
const Customer = require("../models/customerSchema");

exports.neworder = async (req, res) => {
  try {
    const { customerId, productId, status } = req.body;

    const product = await Product.findById(productId);
    const customer = await Customer.findById(customerId);
    if (!product || !customer) {
      return res.status(404).json({ message: "Product or Customer not found" });
    }

    const newOrder = new Order({
      customerId,
      productId,
      status,
    });

    const savedOrder = await newOrder.save();
    res
      .status(201)
      .json({ message: "Order placed successfully", Order: savedOrder });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Orders
exports.getAllOrders = async (req, res) => {
  try {
    const Orders = await Order.find();
    res.status(200).json(Orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Order by CustomerID
exports.getOrderByCustomerId = async (req, res) => {
  try {
    const { customerId } = req.params;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const orders = await Order.find({ customerId: customerId });
    if (!orders.length) {
      return res.status(404).json({ message: "No orders for this customer" });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Order by ID
exports.updateOrder = async (req, res) => {
  try {
    const updated = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, updated, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res
      .status(200)
      .json({ message: "Order updated successfully", Order: updatedOrder });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Order by ID
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// cal revenue
exports.getRevenue = async (req, res) => {
  try {
    const completedOrders = await Order.find({ status: "completed" }).populate(
      "productId"
    );

    if (!completedOrders.length) {
      return res
        .status(200)
        .json({ totalRevenue: 0, message: "No completed orders found" });
    }

    const totalRevenue = completedOrders.reduce((sum, order) => {
      if (!order.productId || order.productId.price == null) {
        console.warn(`Order ${order._id} has no price or product data.`);
        return sum;
      }
      return sum + order.productId.price;
    }, 0);

    res.status(200).json({ totalRevenue });
  } catch (error) {
    console.error("Error calculating total revenue:", error);
    res.status(500).json({ message: "Error calculating total revenue", error });
  }
};

exports.topSellingProduct = async (req, res) => {
  try {
    const completedOrders = await Order.find({ status: "completed" });
    const productCount = {};
    completedOrders.forEach((order) => {
      const productId = order.productId.toString();
      productCount[productId] = (productCount[productId] || 0) + 1;
    });
    const topProductId = Object.keys(productCount).reduce((a, b) =>
      productCount[a] > productCount[b] ? a : b
    );
    const totalCompletedOrders = completedOrders.length;
    const topProductCount = productCount[topProductId];
    const topProductPercentage = (
      (topProductCount / totalCompletedOrders) *
      100
    ).toFixed(2);

    const topProduct = await Product.findById(topProductId);

    res.status(200).json({
      name: topProduct ? topProduct.name : "No top-selling product",
      percentage: topProduct ? parseFloat(topProductPercentage) : 0,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving top-selling product", error });
  }
};

exports.lineStats = async (req, res) => {
  try {
    const completedOrders = await Order.find({ status: "completed" });
    const productCount = {};
    completedOrders.forEach((order) => {
      const productId = order.productId.toString();
      productCount[productId] = (productCount[productId] || 0) + 1;
    });
    const topProductId = Object.keys(productCount).reduce((a, b) =>
      productCount[a] > productCount[b] ? a : b
    );
    const topProduct = await Product.findById(topProductId);
    if (!topProduct) {
      return res.status(404).json({ message: "Top-selling product not found" });
    }
    const monthlySales = await Order.aggregate([
      {
        $match: { status: "completed", productId: topProduct._id },
      },
      {
        $group: {
          _id: { $month: "$created_at" },
          count: { $sum: 1 },
        },
      },
    ]);

    const salesData = Array(12).fill(0);
    monthlySales.forEach((entry) => {
      const monthIndex = entry._id - 1;
      salesData[monthIndex] = entry.count;
    });
    res.status(200).json({
      name: topProduct.name,
      data: salesData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving top-selling product stats", error });
  }
};

exports.barStats = async (req, res) => {
  try {
    const completedOrders = await Order.find({ status: "completed" });
    const productCount = {};
    completedOrders.forEach((order) => {
      const productId = order.productId.toString();
      productCount[productId] = (productCount[productId] || 0) + 1;
    });
    const topProductId = Object.keys(productCount).reduce((a, b) =>
      productCount[a] > productCount[b] ? a : b
    );
    const topProduct = await Product.findById(topProductId);
    if (!topProduct) {
      return res.status(404).json({ message: "Top-selling product not found" });
    }
    const monthlySales = await Order.aggregate([
      {
        $match: { status: "completed", productId: topProduct._id },
      },
      {
        $group: {
          _id: { $month: "$created_at" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const salesData = Array.from({ length: 12 }, (_, i) => ({
      month: months[i],
      value: 0,
    }));
    monthlySales.forEach((entry) => {
      const monthIndex = entry._id - 1;
      salesData[monthIndex].value = entry.count;
    });
    res.status(200).json({
      name: topProduct.name,
      salesData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving top-selling product stats", error });
  }
};
