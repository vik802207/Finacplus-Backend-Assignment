const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Finacorder",
  new mongoose.Schema(
    {
      userId: mongoose.Schema.Types.ObjectId,
      items: [
        {
          productId: mongoose.Schema.Types.ObjectId,
          quantity: Number,
          priceAtPurchase: Number
        }
      ],
      totalAmount: Number,
      orderStatus: {
        type: String,
        default: "Processing"
      }
    },
    { timestamps: true }
  )
);
