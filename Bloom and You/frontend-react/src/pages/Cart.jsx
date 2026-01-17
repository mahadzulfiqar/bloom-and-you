import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/cart.css";

export default function Cart() {
  const { cartItems, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="cart-container">
      
      {/* HEADER */}
      <header className="site-header">
        <div className="logo"><Link to="/">Bloom & You</Link></div>
        <nav className="site-nav">
          <Link to="/products">Products</Link>
          <Link to="/customize">Customize</Link>
          <Link to="/account">Account</Link>
          <Link to="/cart" className="nav-pill">Cart ({cartItems.length})</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>

      <div className="cart-content-wrapper">
        <h1 className="cart-title">Your Bag</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart-msg">
            <h2>Your cart is currently empty.</h2>
            <Link to="/products" className="btn-shop-now">Shop Rituals</Link>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${index}`} className="cart-item-row">
                  <img src={item.img} alt={item.name} className="cart-item-img" />
                  
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p className="cart-item-meta">Size: {item.size} | Scent: {item.scent || "Standard"}</p>
                    {item.note && <p className="cart-item-meta">Note: "{item.note}"</p>}
                  </div>

                  <div className="cart-item-qty">
                    Qty: {item.quantity}
                  </div>

                  <div className="cart-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  <button 
                    className="btn-remove" 
                    onClick={() => removeFromCart(item.id, item.size)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              
              {/* UPDATED BUTTON: Reads latest login state on click */}
              <button
                className="btn-checkout"
                onClick={() => {
                  const user = JSON.parse(localStorage.getItem("user")); // read fresh on click
                  if (!user) {
                    navigate("/account"); // send them to login/signup
                  } else {
                    navigate("/checkout"); // proceed if logged in
                  }
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-contact">
          <h3>contact us</h3>
          <div className="social-icons">
             <a href="https://www.instagram.com/bbloomandyou" target="_blank" rel="noopener noreferrer"><span>📷</span></a>
             <a href="https://pin.it/6PPIfHbEC" target="_blank" rel="noopener noreferrer"><span>📌</span></a>
             <a href="mailto:bloomandyou.social@gmail.com"><span>✉️</span></a>
             <a href="https://www.linkedin.com/company/bloom-and-you/" target="_blank" rel="noopener noreferrer"><span>in</span></a>
             <a href="tel:03152795678"><span>📞</span></a>
             <a href="#"><span>f</span></a>
          </div>
        </div>
        <div className="footer-copyright">
           <span>© 2025 Bloom & You | Privacy Policy | Terms of Service</span>
           <span>Handcrafted in Pakistan. Engineered for Your Wellness.</span>
        </div>
      </footer>
    </div>
  );
}
