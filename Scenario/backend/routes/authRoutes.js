const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const user = await User.create({
      ...req.body,
      passwordHash: req.body.password, // plain password
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN (no bcrypt)
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json("Invalid email");

    if (req.body.password !== user.passwordHash)
      return res.status(400).json("Invalid password");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "mysecretekey", { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
