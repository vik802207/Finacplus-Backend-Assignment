const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Finaccoupon",
  new mongoose.Schema({
    code: String,
    discountPercent: Number,
    expiry: Date
  })
);
