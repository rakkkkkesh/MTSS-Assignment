const express = require("express");
const router = express.Router();
const { addToCart, getCartItems } = require("../Controllers/cartController");

router.post("/", addToCart);
router.get("/", getCartItems);

module.exports = router;