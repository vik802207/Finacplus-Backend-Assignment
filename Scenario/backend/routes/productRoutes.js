const router = require("express").Router();
const Product = require("../models/Product");
const { auth, admin } = require("../middleware/auth");

router.post("/", auth, admin, async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

router.put("/:id", auth, admin, async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  res.json(product);
});

router.delete("/:id", auth, admin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

router.get("/search", async (req, res) => {
  const { q } = req.query;
  const products = await Product.find({ title: new RegExp(q, "i") });
  res.json(products);
});

router.get("/", async (_req, res) => {
  res.json(await Product.find());
});

module.exports = router;
