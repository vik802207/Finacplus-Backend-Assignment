// routes/adminRoutes.js

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { auth, admin } = require("../middleware/auth");
const Admin = require("../models/Admin");
const Product = require("../models/Product");
const Brand = require("../models/Brand");
const Coupon = require("../models/Coupon");
const Order = require("../models/Order");
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await Admin.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Admin already exists" });
    }


    const admin = await Admin.create({
      name,
      email,
      password,
    });

    return res.json({
      message: "Admin registered successfully",
      admin,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -----------------------------------------
// 🔐 ADMIN LOGIN
// -----------------------------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.status(400).json({ message: "Admin not found" });

    if (admin.password !== password)
      return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      "mysecretekey",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Admin login successful",
      token,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -----------------------------------------
// 🟦 PRODUCT MANAGEMENT
// -----------------------------------------

// CREATE PRODUCT
router.post("/product", admin, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json({ message: "Product created", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE PRODUCT
router.put("/product/:id", admin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: "Product updated", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE PRODUCT
router.delete("/product/:id", admin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// -----------------------------------------
// 🏷 BRAND MANAGEMENT
// -----------------------------------------

// CREATE BRAND
router.post("/brand", admin, async (req, res) => {
  try {
    const brand = await Brand.create(req.body);
    res.json({ message: "Brand created", brand });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE BRAND
router.put("/brand/:id", admin, async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: "Brand updated", brand });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE BRAND
router.delete("/brand/:id", admin, async (req, res) => {
  try {
    await Brand.findByIdAndDelete(req.params.id);
    res.json({ message: "Brand deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// -----------------------------------------
// 🎫 COUPON MANAGEMENT
// -----------------------------------------

router.post("/coupon", admin, async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.json({ message: "Coupon created", coupon });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/coupon/:id", admin, async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: "Coupon updated", coupon });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/coupon/:id", admin, async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.json({ message: "Coupon deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// -----------------------------------------
// 📦 ORDER MANAGEMENT
// -----------------------------------------

// GET ALL ORDERS
router.get("/orders", admin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE ORDER STATUS
router.put("/order/:id/status", admin, async (req, res) => {
  try {
    const { status } = req.body; // packed / shipped / delivered / cancelled
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
