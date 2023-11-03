const { default: mongoose } = require("mongoose");

// Mongoose Models
const Product = mongoose.model("Product", {
  name: String,
  description: String,
  price: Number,
  quantity: Number,
  category: String,
});

module.exports = Product;
