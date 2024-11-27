const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Customer = require("../models/customerSchema");
const Admin = require("../models/adminSchema");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const ACCESS_TOKEN_EXPIRY = process.env.JWT_REFRESH_SECRET || "15m";
const REFRESH_TOKEN_EXPIRY = process.env.JWT_REFRESH_SECRET || "7d";

const generateAccessToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
};

const generateRefreshToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
};

const userSignUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await Customer.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new Customer({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in userSignUp:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Customer.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const accessToken = generateAccessToken(user._id, "customer");
    const refreshToken = generateRefreshToken(user._id, "customer");

    res.status(200).json({
      accessToken,
      refreshToken,
      user: { email: user.email, name: user.name },
    });
  } catch (error) {
    console.error("Error in userLogin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const accessToken = generateAccessToken(admin._id, "admin");
    const refreshToken = generateRefreshToken(admin._id, "admin");

    res.status(200).json({
      accessToken,
      refreshToken,
      admin: { email: admin.email, name: admin.name },
    });
  } catch (error) {
    console.error("Error in adminLogin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const refreshToken = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Refresh token is required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET);
    const newAccessToken = generateAccessToken(decoded.id, decoded.role);

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Error in refreshToken:", error);
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

module.exports = {
  userSignUp,
  userLogin,
  adminLogin,
  refreshToken,
};
