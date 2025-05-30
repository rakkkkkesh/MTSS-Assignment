import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from "../Context/CartContext";
import "../Styles/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
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

  const handleClearCart = async () => {
    try {
      await axios.delete(`${BASE_URL}/cart`);
      setItems([]);
      setCartCount(0);
      toast.success("Cart cleared successfully");
    } catch (error) {
      toast.error("Failed to clear cart");
    } finally {
      setShowModal(false);
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
            <button onClick={() => setShowModal(true)} className="clear-cart-btn btn btn-danger me-2">Clear Cart</button>
            <button onClick={() => navigate(-1)} className="cart-go-back-btn btn btn-secondary">Go Back</button>
          </div>

          {/* Modal */}
          {showModal && (
            <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Confirm Clear Cart</h5>
                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                  </div>
                  <div className="modal-body">
                    <p>Are you sure you want to clear your cart?</p>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-danger" onClick={handleClearCart}>Clear Cart</button>
                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;