const { default: mongoose } = require("mongoose");

// Category Model
const Category = mongoose.model("Category", {
  name: String,
});

module.exports = Category;
