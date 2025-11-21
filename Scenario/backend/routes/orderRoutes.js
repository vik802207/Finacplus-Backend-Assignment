const router = require("express").Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const { auth } = require("../middleware/auth");

router.post("/place", auth, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");

  const total = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  const order = await Order.create({
    userId: req.user.id,
    items: cart.items.map(i => ({
      productId: i.productId._id,
      quantity: i.quantity,
      priceAtPurchase: i.productId.price
    })),
    totalAmount: total
  });

  await Cart.deleteOne({ userId: req.user.id });

  res.json(order);
});

router.get("/", auth, async (req, res) => {
  res.json(await Order.find({ userId: req.user.id }).sort({ createdAt: -1 }));
});

module.exports = router;
