const Product = require("../models/productModel");

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: "Could not create the product." });
  }
};

// Retrieve all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products." });
  }
};

// Retrieve a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error fetching product." });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: "Could not update the product." });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error deleting the product." });
  }
};

// Delete all products
exports.deleteAllProducts = async (req, res) => {
  try {
    await Product.deleteMany({});
    res.json({ message: "All products have been removed." });
  } catch (error) {
    res.status(500).json({ error: "Error deleting all products." });
  }
};

// Search for products by name containing a keyword
exports.searchProductsByName = async (req, res) => {
  const keyword = req.query.name;
  if (!keyword) {
    return res.status(400).json({ error: "Search keyword is required." });
  }
  try {
    const products = await Product.find({
      name: { $regex: keyword, $options: "i" },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error searching for products." });
  }
};
