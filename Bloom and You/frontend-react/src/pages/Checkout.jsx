import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/checkout.css";

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    firstName: "", 
    lastName: "", 
    email: "", 
    address: "", 
    city: "", 
    zip: "", 
    cardNum: "", 
    expiry: "", 
    cvv: ""
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0 && !orderPlaced) {
      navigate("/cart");
    }
  }, [cartItems, navigate, orderPlaced]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage("");
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // 1. VALIDATION LOGIC
    const isEmpty = Object.values(formData).some(value => value.trim() === "");
    if (isEmpty) {
      setErrorMessage("Please fill in all shipping and payment details.");
      window.scrollTo(0, 0);
      return;
    }

    // 2. CHECK LOGGED-IN USER
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setErrorMessage("You must be logged in to place an order.");
      navigate("/account");
      return;
    }

    setIsProcessing(true);

    try {
      // 3. SEND ORDER TO BACKEND
      const response = await fetch("http://localhost:5000/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          items: cartItems.map(item => ({
            productId: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            size: item.size,
            scent: item.scent,
            note: item.note
          })),
          total: cartTotal,
          shippingInfo: {
            fullName: formData.firstName + " " + formData.lastName,
            address: formData.address,
            city: formData.city,
            postalCode: formData.zip,
            country: "Pakistan", // Hard-coded for now
            phone: formData.email // Replace if you collect phone separately
          }
        })
      });

      const data = await response.json();

      if (data.success) {
        setOrderPlaced(true);
        clearCart();
      } else {
        setErrorMessage(data.message || "Failed to place order");
      }
    } catch (error) {
      setErrorMessage("Server error. Try again later.");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="checkout-container">
        <header className="site-header">
           <div className="logo"><Link to="/">Bloom & You</Link></div>
        </header>

        <div className="success-container">
          <h1 className="success-title">Thank You, {formData.firstName}!</h1>
          <p>Your order has been placed successfully.</p>
          <p>Confirmation sent to: <strong>{formData.email}</strong></p>
          <br />
          <Link to="/products" className="btn-place-order" style={{display: 'inline-block', maxWidth: '300px', textDecoration: 'none'}}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      {/* HEADER */}
      <header className="site-header">
        <div className="logo"><Link to="/">Bloom & You</Link></div>
        <nav className="site-nav">
          <Link to="/cart">Return to Cart</Link>
        </nav>
      </header>

      <div className="checkout-wrapper">
        
        {/* LEFT: INPUT FORMS */}
        <form className="checkout-forms">
          {/* Shipping and Payment Forms (unchanged) */}
          <h2 className="checkout-section-title">Shipping Information</h2>
          <div className="form-row">
            <div className="checkout-group">
              <label className="checkout-label">First Name</label>
              <input 
                name="firstName" 
                type="text" 
                className="checkout-input" 
                onChange={handleChange} 
                value={formData.firstName}
              />
            </div>
            <div className="checkout-group">
              <label className="checkout-label">Last Name</label>
              <input 
                name="lastName" 
                type="text" 
                className="checkout-input" 
                onChange={handleChange} 
                value={formData.lastName}
              />
            </div>
          </div>

          <div className="checkout-group">
            <label className="checkout-label">Email</label>
            <input 
              name="email" 
              type="email" 
              className="checkout-input" 
              onChange={handleChange} 
              value={formData.email}
            />
          </div>

          <div className="checkout-group">
            <label className="checkout-label">Address</label>
            <input 
              name="address" 
              type="text" 
              className="checkout-input" 
              onChange={handleChange} 
              value={formData.address}
            />
          </div>

          <div className="form-row">
            <div className="checkout-group">
              <label className="checkout-label">City</label>
              <input 
                name="city" 
                type="text" 
                className="checkout-input" 
                onChange={handleChange} 
                value={formData.city}
              />
            </div>
            <div className="checkout-group">
              <label className="checkout-label">Zip Code</label>
              <input 
                name="zip" 
                type="text" 
                className="checkout-input" 
                onChange={handleChange} 
                value={formData.zip}
              />
            </div>
          </div>

          <h2 className="checkout-section-title">Payment Details</h2>
          <div className="checkout-group">
            <label className="checkout-label">Card Number</label>
            <input 
              name="cardNum" 
              type="text" 
              placeholder="0000 0000 0000 0000" 
              className="checkout-input" 
              maxLength="19" 
              onChange={handleChange} 
              value={formData.cardNum}
            />
          </div>

          <div className="form-row">
            <div className="checkout-group">
              <label className="checkout-label">Expiry (MM/YY)</label>
              <input 
                name="expiry" 
                type="text" 
                placeholder="MM/YY" 
                className="checkout-input" 
                maxLength="5" 
                onChange={handleChange} 
                value={formData.expiry}
              />
            </div>
            <div className="checkout-group">
              <label className="checkout-label">CVV</label>
              <input 
                name="cvv" 
                type="text" 
                placeholder="123" 
                className="checkout-input" 
                maxLength="3" 
                onChange={handleChange} 
                value={formData.cvv}
              />
            </div>
          </div>
        </form>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="checkout-summary">
          <h3 className="summary-title">Order Summary</h3>
          
          <div className="summary-items">
            {cartItems.map((item, index) => (
              <div key={index} className="summary-item">
                <div>
                  <div className="summary-item-name">{item.name}</div>
                  <div className="summary-item-meta">Qty: {item.quantity} | Size: {item.size}</div>
                </div>
                <div>${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="cost-row">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="cost-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="cost-row total">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>

          {errorMessage && (
            <div style={{ color: '#D32F2F', fontSize: '0.9rem', marginTop: '15px', fontWeight: '600', textAlign: 'center' }}>
              {errorMessage}
            </div>
          )}

          <button 
            type="button"
            className="btn-place-order"
            onClick={handlePlaceOrder}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Place Order"}
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-copyright" style={{justifyContent: 'center'}}>
          <span>© 2025 Bloom & You | Secure Checkout</span>
        </div>
      </footer>
    </div>
  );
}
