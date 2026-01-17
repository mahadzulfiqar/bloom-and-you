import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/category.css";

// Image imports
import sc10 from "../assets/images/sc10.jpeg"; 
import sc2  from "../assets/images/sc2.jpeg"; 
import sc3  from "../assets/images/sc3.jpeg"; 
import sc4  from "../assets/images/sc4.jpeg";
import sc9  from "../assets/images/sc9.jpeg"; 
import sc6  from "../assets/images/sc6.jpeg";

export default function ScentedCandles() {
  const { addToCart } = useCart();

  const items = [
    { id: "sc1", name: "Rose Water", price: 25, img: sc2 },
    { id: "sc2", name: "Vanilla Bean", price: 22, img: sc3 },
    { id: "sc3", name: "Midnight Musk", price: 34, img: sc4 },
    { id: "sc4", name: "Lavender Dream", price: 22, img: sc9 },
    { id: "sc5", name: "Calm Leaf", price: 30, img: sc6 },
    { id: "sc6", name: "Peach Serene", price: 26, img: sc10 },
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
        <h1 className="category-title">Scented Candles</h1>
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
                onClick={() =>
                  addToCart({ ...item, quantity: 1, size: "Standard" })
                }
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
