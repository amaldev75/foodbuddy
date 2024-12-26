import React from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../hooks/CartContext";
import "./CartPage.css";

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart } = useCartContext();
  console.log("Cart on CartPage:", cart);
  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + (item.price || 0) * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="cart-page">
      {/* Navbar */}
      <nav className="cart-navbar">
        <h1>FoodBuddy</h1>
        <button onClick={() => navigate("/main")} className="navbar-button">
          Continue Shopping
        </button>
      </nav>

      {/* Cart Content */}
      <div className="cart-content">
        <h2>Your Shopping Cart</h2>
        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty. Start shopping now!</p>
          </div>
        ) : (
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item._id} className="cart-item">
                {/* Item Image */}
                <img
                  src={item.imgsrc}
                  alt={item.title}
                  className="cart-item-image"
                />

                {/* Item Details */}
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p>Price: ₹ {(item.price || 0).toFixed(2)}</p>
                </div>

                {/* Quantity Controls */}
                <div className="cart-item-quantity">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                {/* Total Price per Item */}
                <p className="cart-item-total">
                  Total: ₹ {((item.price || 0) * item.quantity).toFixed(2)}
                </p>

                {/* Remove Button */}
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className="cart-footer">
            <h3>Total Amount: ₹ {calculateTotal()}</h3>
            <button
              className="checkout-button"
              onClick={() => navigate("/address")}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
