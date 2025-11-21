const router = require("express").Router();
const Brand = require("../models/Brand");
const { auth, admin } = require("../middleware/auth");

router.post("/", auth, admin, async (req, res) => {
  res.json(await Brand.create(req.body));
});

router.get("/", async (_req, res) => {
  res.json(await Brand.find());
});

module.exports = router;
