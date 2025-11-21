const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Finacproduct",
  new mongoose.Schema(
    {
      name: String,
      description: String,
      brand: String,
      category: String,
      price: Number,
      discountPrice: Number,
      stock: Number,
      image: String,
      rating: Number
    },
    { timestamps: true }
  )
);
