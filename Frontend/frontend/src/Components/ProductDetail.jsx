import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from "../Context/CartContext";
import "../Styles/style.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://localhost:5000/api";
  const { setCartCount } = useCart();
  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Error fetching product details");
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    axios.get(`${BASE_URL}/cart`)
      .then(res => {
        const inCart = res.data.some(item => item.productId === Number(id));
        setIsAdded(inCart);
      })
      .catch(() => toast.error("Error checking cart"));
  }, [id]);

  const addToCart = () => {
    axios.post(`${BASE_URL}/cart`, {
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    })
      .then(() => {
        setIsAdded(true);
        setCartCount(prev => prev + 1);
        toast.success("Product added to cart!");
      })
      .catch(() => {
        toast.error("Failed to add product to cart.");
      });
  };

  if (loading) return <p className="loading">Loading product details...</p>;

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.title} className="product-detail-image" />
      <div className="product-detail-info">
        <h2>{product.title}</h2>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Description:</strong> {product.description}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Rating:</strong> ⭐ {product.rating?.rate} ({product.rating?.count} reviews)</p>
        <div className="product-details-btn">
          <button
            onClick={addToCart}
            disabled={isAdded}
            className="add-to-cart-btn"
          >
            {isAdded ? "Added to Cart" : "Add to Cart"}
          </button>

          <button onClick={() => navigate(-1)} className="go-back-btn">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;