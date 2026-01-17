import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/category.css";

// Image imports
import pj1 from "../assets/images/pj1.jpeg"; 
import pj2 from "../assets/images/pj2.jpeg"; 
import pj8 from "../assets/images/pj8.jpeg"; 
import pj4 from "../assets/images/pj4.jpeg";
import pj5 from "../assets/images/pj5.jpeg"; 
import pj6 from "../assets/images/pj6.jpeg";

export default function Pajamas() {
  const { addToCart } = useCart();

  const items = [
    { id: "pj1", name: "Silk Set", price: 85, img: pj1 },
    { id: "pj2", name: "Cotton Classic", price: 60, img: pj2 },
    { id: "pj3", name: "Lace Trim", price: 75, img: pj8 },
    { id: "pj4", name: "Satin Robe", price: 90, img: pj4 },
    { id: "pj5", name: "Cozy Flannel", price: 65, img: pj5 },
    { id: "pj6", name: "Summer Shortie", price: 55, img: pj6 },
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
        <h1 className="category-title">Pajamas</h1>
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
                  addToCart({ ...item, quantity: 1, size: "M" })
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
