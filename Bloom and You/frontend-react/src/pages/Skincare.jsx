import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/category.css";

import sk1 from "../assets/images/sk1.jpeg"; 
import sk3 from "../assets/images/sk3.jpeg"; 
import sk4 from "../assets/images/sk4.jpeg"; 
import sk5 from "../assets/images/sk5.jpeg";
import sk7 from "../assets/images/sk7.jpeg"; 
import sk9 from "../assets/images/sk9.jpeg";



export default function Skincare() {
  const { addToCart } = useCart();
  const items = [
    { id: "sk1", name: "Rose Clean", price: 45, img: sk1 },
    { id: "sk2", name: "Hydrating Mist", price: 25, img: sk3 },
    { id: "sk3", name: "Lilac Glow", price: 55, img: sk4 },
    { id: "sk4", name: "Face Moisturizer", price: 35, img: sk5 },
    { id: "sk5", name: "Herbal Balance", price: 30, img: sk7 },
    { id: "sk6", name: "Midnight Calm", price: 15, img: sk9 },
  ];

  return (
    <div className="category-container">
      <header className="site-header">
        <div className="logo"><Link to="/">Bloom & You</Link></div>
        <nav className="site-nav"><Link to="/products">Return to Products</Link><Link to="/cart">Cart</Link></nav>
      </header>
      <div className="category-wrapper">
        <h1 className="category-title">Skincare</h1>
        <div className="cat-grid">
          {items.map(item => (
            <div key={item.id} className="cat-card">
              <div className="cat-img-placeholder"><img src={item.img} alt={item.name} /></div>
              <h3 className="cat-name">{item.name}</h3>
              <p className="cat-price">${item.price}</p>
              <button className="btn-add-specific" onClick={() => addToCart({ ...item, quantity: 1, size: 'Standard' })}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}