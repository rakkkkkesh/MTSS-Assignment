import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);

    // const BASE_URL = "http://localhost:5000/api";
    const BASE_URL = "https://mtss-assignment.onrender.com/api";

    const fetchCartCount = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/cart`);
            setCartCount(res.data.length);
        } catch (error) {
            console.error("Error fetching cart count", error);
        }
    };

    useEffect(() => {
        fetchCartCount();
    }, []);

    return (
        <CartContext.Provider value={{ cartCount, setCartCount, fetchCartCount }}>
            {children}
        </CartContext.Provider>
    );
};