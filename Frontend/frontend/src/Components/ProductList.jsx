import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../Styles/style.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Error fetching products");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Loading products...</p>;

  return (
    <div className="product-list">
      <h1 className="product-list-heading">Explore Our Products</h1>
      <div className="product-grid">
        {products.map(p => (
          <Link to={`/products/${p.id}`} key={p.id} className="product-card">
            <img src={p.image} alt={p.title} />
            <h3>{p.title}</h3>
            <p>Price: <span>${p.price}</span></p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;