const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Finaccart",
  new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    items: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        quantity: Number
      }
    ]
  })
);
