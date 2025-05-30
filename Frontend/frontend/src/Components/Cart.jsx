import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from "../Context/CartContext";
import "../Styles/style.css";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { setCartCount } = useCart();

  // const BASE_URL = "http://localhost:5000/api";
  const BASE_URL = "https://mtss-assignment.onrender.com/api";

  useEffect(() => {
    axios.get(`${BASE_URL}/cart`)
      .then(res => {
        setItems(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load cart items");
        setLoading(false);
      });
  }, []);

  const clearCart = async () => {
    try {
      await axios.delete(`${BASE_URL}/cart`);
      setItems([]);
      setCartCount(0);
      toast.success("Cart cleared successfully");
    } catch (error) {
      toast.error("Failed to clear cart");
    }
  };

  const total = items.reduce((acc, item) => acc + item.price, 0);

  if (loading) return <p className="loading">Loading cart...</p>;

  return (
    <div className="cart">
      {items.length === 0 ? (
        <p className="loading">Your cart is empty.</p>
      ) : (
        <>
          <h2>Cart Items</h2>
          <div className="table-responsive">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price ($)</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item._id}
                    className="cart-row"
                    onClick={() => navigate(`/products/${item.productId}`)}
                    style={{ cursor: "pointer" }}>
                    <td><img src={item.image} alt={item.title} /></td>
                    <td>{item.title}</td>
                    <td>{item.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cart-total-row">
            <h3>Total Price: ${total.toFixed(2)}</h3>
            <button onClick={clearCart} className="clear-cart-btn">Clear Cart</button>
            <button onClick={() => navigate(-1)} className="cart-go-back-btn">Go Back</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;