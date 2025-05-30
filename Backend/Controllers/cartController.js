const Cart = require("../Models/Cart");

exports.addToCart = async (req, res) => {
  try {
    const item = new Cart(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: "Failed to add to cart" });
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const items = await Cart.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
};