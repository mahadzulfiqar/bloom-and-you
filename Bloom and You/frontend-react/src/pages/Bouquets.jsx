import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/category.css";

// Import bouquet images
import b1 from "../assets/images/b1.jpeg"; 
import b2 from "../assets/images/b2.jpeg"; 
import b3 from "../assets/images/b3.jpeg"; 
import b4 from "../assets/images/b4.jpeg";
import b5 from "../assets/images/b5.jpeg"; 
import b6 from "../assets/images/b6.jpeg";

export default function Bouquets() {
  const { addToCart } = useCart();

  const items = [
    { id: "bq1", name: "Red Romance", price: 50, img: b1 },
    { id: "bq2", name: "Spring Mix", price: 45, img: b2 },
    { id: "bq3", name: "Dried Boho", price: 55, img: b3 },
    { id: "bq4", name: "Gilded Petals", price: 40, img: b4 },
    { id: "bq5", name: "Moonlit Blooms", price: 60, img: b5 },
    { id: "bq6", name: "Garden Grace", price: 65, img: b6 },
  ];

  return (
    <div className="category-container">
      <header className="site-header">
        <div className="logo">
          <Link to="/">Bloom & You</Link>
        </div>
        <nav className="site-nav">
          <Link to="/products">Return to Products</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      </header>

      <div className="category-wrapper">
        <h1 className="category-title">Bouquets</h1>
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
