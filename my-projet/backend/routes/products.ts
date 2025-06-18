const express = require("express");
const cors = require("cors");
const Product = require("./models/Product"); // ton modèle

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/products/best-sellers", async (req, res) => {
  const products = await Product.find().sort({ sales: -1 }).limit(10);
  res.json(products);
});

app.listen(5000, () => console.log("Backend running on port 5000"));
