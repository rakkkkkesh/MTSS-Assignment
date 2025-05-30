const express = require("express");
const router = express.Router();
const {
  getCartItems,
  addToCart,
  clearCart
} = require("../Controllers/cartController");

router.get("/", getCartItems);
router.post("/", addToCart);
router.delete("/", clearCart);

module.exports = router;