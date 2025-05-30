import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import "../Styles/style.css";

const Navbar = () => {
  const { cartCount } = useCart();

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/cart">
        Cart <span className="nav-cart-count">({cartCount})</span>
      </Link>
    </nav>
  );
};

export default Navbar;