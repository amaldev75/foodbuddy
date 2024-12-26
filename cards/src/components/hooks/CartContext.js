import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./hook";

const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  updateQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export default function CartProvider({ children }) {
  const { user } = useAuthContext();
  const [cart, setCart] = useState([]);

  // Log the current user for debugging
  console.log("Current user in CartProvider:", user);

  // Load user-specific cart from localStorage on user login
  useEffect(() => {
    if (user && user.user_id) {
      console.log(`Loading cart for user ${user.user_id}`);
      const userCart = localStorage.getItem(`cart_${user.user_id}`);
      setCart(userCart ? JSON.parse(userCart) : []);
    } else {
      console.log("No user logged in or invalid user. Clearing cart.");
      setCart([]);
    }
  }, [user]);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (user && user.user_id) {
      console.log(`Saving cart for user ${user.user_id}`);
      localStorage.setItem(`cart_${user.user_id}`, JSON.stringify(cart));
    } else {
      console.warn("Cannot save cart. User is undefined or invalid.");
    }
  }, [cart, user]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem._id === item._id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === itemId ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
    if (user && user.user_id) {
      localStorage.removeItem(`cart_${user.user_id}`);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => useContext(CartContext);
