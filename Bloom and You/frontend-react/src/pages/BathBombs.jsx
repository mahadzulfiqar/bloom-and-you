import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/category.css";

// Import your actual images
import bb1 from "../assets/images/bb1.jpeg"; 
import bb4 from "../assets/images/bb4.jpeg"; 
import bb5 from "../assets/images/bb5.jpeg"; 
import bb6 from "../assets/images/bb6.jpeg"; 
import bb7 from "../assets/images/bb7.jpeg";
import bb8 from "../assets/images/bb8.jpeg";

export default function BathBombs() {
  const { addToCart } = useCart();

  const items = [
    { id: "bb1", name: "Fizz Berry", price: 12, img: bb1 },
    { id: "bb2", name: "Rose Soak", price: 14, img: bb6 },
    { id: "bb3", name: "Peach Glow", price: 15, img: bb5 },
    { id: "bb4", name: "Herbal Soak", price: 10, img: bb7 },
    { id: "bb5", name: "Galaxy Swirl", price: 13, img: bb4 },
    { id: "bb6", name: "Vanilla Cloud", price: 11, img: bb8 },
  ];

  return (
    <div className="category-container">
      <header className="site-header">
        <div className="logo"><Link to="/">Bloom & You</Link></div>
        <nav className="site-nav">
          <Link to="/products">Return to Products</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      </header>

      <div className="category-wrapper">
        <h1 className="category-title">Bath Bombs</h1>
        <div className="cat-grid">
          {items.map((item, index) => (
            <div 
              key={item.id} 
              id={`card-${index + 1}`} 
              className="cat-card"
            >
              <div className="cat-img-placeholder">
                <img src={item.img} alt={item.name} />
              </div>
              <h3 className="cat-name">{item.name}</h3>
              <p className="cat-price">${item.price}</p>
              <button 
                className="btn-add-specific" 
                onClick={() => addToCart({ ...item, quantity: 1, size: 'Standard' })}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
