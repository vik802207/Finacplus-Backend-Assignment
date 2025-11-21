const router = require("express").Router();
const Coupon = require("../models/Coupon");
const { auth, admin } = require("../middleware/auth");

router.post("/", auth, admin, async (req, res) => {
  res.json(await Coupon.create(req.body));
});

router.get("/", async (_req, res) => res.json(await Coupon.find()));

module.exports = router;
