const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const cartRoutes = require("./Routes/cartRoutes");

const app = express();
app.use(cors({
  origin: ['https://mtss-assignment.netlify.app', 'http://localhost:5000'],
  credentials: true
}));
app.use(express.json());

app.use("/api/cart", cartRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log(err));
