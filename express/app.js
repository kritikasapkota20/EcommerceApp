
const express = require("express");
const app = express();
const port = 3003;
const { query, validationResult } = require("express-validator");
const connectDb = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const cors=require("cors");

app.use(express.json());
app.use(express.static("uploads"));
app.use(cors());

connectDb();

app.get(
  "/add-product",
  query("name").notEmpty(),
  query("price").notEmpty(),
  (req, res) => {
    const result = validationResult(req);
    res.json({
      errors: result.array(),
    });
  }
);

app.use("/products", productRoutes);
app.use("/auth", authRoutes);

app.all("*", (req, res) => {
  res.status(404).json({
    message: "Route not found.",
  });
});

app.listen(port, () => {
  console.log(`Ecommerce app listening on port ${port}`);
});

// Home Work: Add validtor for all the end points
// Add product api can be called by user without admin role what can we do about it??

// Role based authroization,
// Error handling.
