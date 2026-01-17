console.log("🔥 THIS INDEX.JS IS RUNNING 🔥");

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Contact = require("./models/Contact");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Order = require("./models/Order");


const app = express();
app.use(cors());
app.use(express.json());

// ✅ CONNECT TO MONGODB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend + MongoDB is working!");
});

// ✅ Contact form route
app.post("/contact", async (req, res) => {
  try {
    console.log("📩 Incoming contact data:", req.body);

    const { name, email, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();

    console.log("✅ Saved to MongoDB");

    res.json({
      success: true,
      message: "Message saved to database!",
    });
  } catch (error) {
    console.error("❌ Error saving contact:", error);
    res.status(500).json({
      success: false,
      message: "Error saving message",
    });
  }
});

// ✅ REGISTER API
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.json({ success: true, message: "Account created successfully" });
  } catch (error) {
    console.error("❌ Registration error:", error);
    res.status(500).json({ success: false, message: "Registration failed" });
  }
});

// ✅ LOGIN API (NEW)
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    // 3️⃣ Success
    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ success: false, message: "Login failed" });
  }
});

//checkout api
app.post("/checkout", async (req, res) => {
  try {
    const { userId, items, total, shippingInfo } = req.body;

    if (!userId || !items || !total || !shippingInfo) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newOrder = new Order({
      userId,
      items,
      total,
      shippingInfo
    });

    const savedOrder = await newOrder.save();

    res.json({
      success: true,
      message: "Order placed successfully",
      order: savedOrder
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});




// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
