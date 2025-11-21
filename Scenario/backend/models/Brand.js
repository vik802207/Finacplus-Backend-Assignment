const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Finacbrand",
  new mongoose.Schema({
    name: String,
    logo: String
  })
);
