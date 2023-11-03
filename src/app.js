const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productController = require("./controllers/productController");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

const mongoURI =
  "mongodb+srv://assign2:Assign2_123@cluster0.mkd3jsb.mongodb.net/Marketplace?retryWrites=true&w=majority";

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to DressStore Application");
});

app.get("/api/products", (req, res) => {
  if (req.query.name) {
    productController.searchProductsByName(req, res);
  } else return productController.getAllProducts(req, res);
});
app.get("/api/products/:id", productController.getProductById);
app.post("/api/products", productController.createProduct);
app.put("/api/products/:id", productController.updateProduct);
app.delete("/api/products/:id", productController.deleteProduct);
app.delete("/api/products", productController.deleteAllProducts);

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.error("Error connecting to MongoDB: ", err));
