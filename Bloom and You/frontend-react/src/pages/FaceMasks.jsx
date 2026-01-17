import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/category.css";


import fm1 from "../assets/images/fm1.jpeg"; 
import fm2 from "../assets/images/fm2.jpeg"; 
import  fm3 from "../assets/images/fm3.jpeg"; 
import fm4 from "../assets/images/fm4.jpeg";
import fm7 from "../assets/images/fm7.jpeg"; 
import  fm8 from "../assets/images/fm8.jpeg";

export default function FaceMasks() {
  const { addToCart } = useCart();
  const items = [
    { id: "fm1", name: "Gold Foil", price: 10, img: fm1 },
    { id: "fm2", name: "Cucumber Cool", price: 8, img: fm2},
    { id: "fm3", name: "Charcoal Peel", price: 12, img: fm3},
    { id: "fm4", name: "Berry Bright", price: 9, img: fm4},
    { id: "fm5", name: "Herbal Calm", price: 11, img: fm7 },
    { id: "fm6", name: "Vanilla Soft", price: 8, img: fm8 },
  ];

  return (
    <div className="category-container">
      <header className="site-header">
        <div className="logo"><Link to="/">Bloom & You</Link></div>
        <nav className="site-nav"><Link to="/products">Return to Products</Link><Link to="/cart">Cart</Link></nav>
      </header>
      <div className="category-wrapper">
        <h1 className="category-title">Face Masks</h1>
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