const express = require("express");
const app = express();
const connectDB = require("./config/db");

connectDB();

app.use(express.json());
app.use(require("cors")());
app.get("/", (_req, res) => res.send("API is running..."));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/coupons", require("./routes/couponRoutes"));
app.use("/api/brands", require("./routes/brandRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));
