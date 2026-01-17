import React from "react";
import { Link } from "react-router-dom";
import "../styles/products.css";

// Image imports
import sc1 from "../assets/images/sc1.jpeg"; 
import bb8 from "../assets/images/bb8.jpeg"; 
import pj4 from "../assets/images/pj4.jpeg"; 
import sk2 from "../assets/images/sk2.jpeg";
import b2  from "../assets/images/b2.jpeg"; 
import fm4 from "../assets/images/fm4.jpeg";

export default function Products() {
  // Added 'categoryKey' to match the keys in Customize.jsx
  const products = [
    { 
      id: 1, 
      name: "Scented Candles", 
      path: "/Scented-candles",   // kept EXACTLY from generated code
      categoryKey: "candles",
      desc: "Hand-poured Candles",
      img: sc1
    },
    { 
      id: 2, 
      name: "Bath Bombs", 
      path: "/bath-bombs", 
      categoryKey: "bathbombs",
      desc: "Artisan Bath Rituals",
      img: bb8
    },
    { 
      id: 3, 
      name: "Pajamas", 
      path: "/pajamas", 
      categoryKey: "pajamas",
      desc: "Luxe Loungewear",
      img: pj4
    },
    { 
      id: 4, 
      name: "Skincare", 
      path: "/skincare", 
      categoryKey: "skincare",
      desc: "Skin Health Sets",
      img: sk2
    },
    { 
      id: 5, 
      name: "Bouquets", 
      path: "/bouquets", 
      categoryKey: "bouquets",
      desc: "Fresh Arrangements",
      img: b2
    },
    { 
      id: 6, 
      name: "Face Masks", 
      path: "/facemasks", 
      categoryKey: "facemasks",
      desc: "Targeted Treatments",
      img: fm4
    },
  ];

  return (
    <div className="products-container">
      <header className="site-header">
        <div className="logo"><Link to="/">Bloom & You</Link></div>
        <nav className="site-nav">
          <Link to="/products" className="nav-pill active">Products</Link>
          <Link to="/customize">Customize</Link>
          <Link to="/account">Account</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>

      <div className="products-wrapper">
        <h1 className="products-title">FIND YOUR BLOOM</h1>
        <p className="products-subtitle">
          SELECT A CATEGORY TO SHOP READY RITUALS, <br />
          OR CHOOSE "CUSTOMIZE" TO DESIGN FROM SCRATCH.
        </p>

        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="main-product-card">
              
              <div className="card-img-wrapper">
                <Link to={product.path}>
                  <img src={product.img} alt={product.name} />
                </Link>
              </div>
              
              <div className="card-details">
                {/* Shop Button */}
                <Link to={product.path} className="btn-product-name">
                  Shop {product.name}
                </Link>

                <p className="product-desc">{product.desc}</p>

                {/* Customize Button */}
                <Link 
                  to="/customize" 
                  state={{ category: product.categoryKey }} 
                  className="btn-customize-pill"
                >
                  Customize
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="site-footer">
        <div className="footer-copyright">
          <span>© 2025 Bloom & You | Handcrafted for Your Wellness.</span>
        </div>
      </footer>
    </div>
  );
}
