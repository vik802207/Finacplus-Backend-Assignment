const router = require("express").Router();
const Cart = require("../models/Cart");
const { auth } = require("../middleware/auth");

router.post("/add", auth, async (req, res) => {
  const cart = await Cart.findOneAndUpdate(
    { userId: req.user.id },
    { $push: { items: req.body } },
    { upsert: true, new: true }
  );
  res.json(cart);
});

router.get("/", auth, async (req, res) => {
  res.json(await Cart.findOne({ userId: req.user.id }).populate("items.productId"));
});

module.exports = router;
