const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Finacuser",
  new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    passwordHash: String,
    role: { type: String, default: "user" }
  })
);
