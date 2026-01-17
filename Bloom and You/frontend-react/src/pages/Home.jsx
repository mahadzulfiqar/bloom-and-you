import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css"; 

// OUR STORY images
import os1 from "../assets/images/os1.png"; 
import os2 from "../assets/images/os2.png";

// Product grid images
import pj6 from "../assets/images/pj6.jpeg";
import bb1 from "../assets/images/bb1.jpeg";
import sk2 from "../assets/images/sk2.jpeg";
import sc9 from "../assets/images/sc9.jpeg";
import b4  from "../assets/images/b4.jpeg";
import fm5 from "../assets/images/fm5.jpeg";

// Most selling images
import sc2 from "../assets/images/sc2.jpeg";
import bb7  from "../assets/images/bb7.jpeg";
import b2  from "../assets/images/b2.jpeg";
import pj8  from "../assets/images/pj8.jpeg"; // Fixed typo in import path (was ".jpeg")

export default function Home() {

  const products = [
    { id: 1, name: "CLOUD COMFORT PJS", subtitle: "Glance soon", btn: "CUSTOMIZE", img: pj6 },
    { id: 2, name: "FIZZ & DREAM", subtitle: "make it yours!", btn: "CUSTOMIZE", img: bb1 },
    { id: 3, name: "GLOW POTIONS", subtitle: "make a you!", btn: "CUSTOMIZE", img: sk2 },
    { id: 4, name: "ZEN GARDEN", subtitle: "mix & match", btn: "CUSTOMIZE", img: sc9 },
    { id: 5, name: "BESPOKE BLOOMS", subtitle: "ACCESSORIES", btn: "CUSTOMIZE", img: b4 },
    { id: 6, name: "Face sheet masks", subtitle: "Targeted Treatments", btn: "CUSTOMIZE", img: fm5 },
  ];

  const sellingProducts = [
    { 
      id: 101, 
      name: "Rose Water", 
      price: "$25.00", 
      img: sc2,
      link: "/scented-candles#card-2"
    },
    { 
      id: 102, 
      name: "Herbal Soak", 
      price: "$10.00", 
      img: bb7,
      link: "/bath-bombs#card-6"
    },
    { 
      id: 103, 
      name: "Spring Mix", 
      price: "$45.00", 
      img: b2,
      link: "/bouquets#card-3"
    },
    { 
      id: 104, 
      name: "Lace Trim", 
      price: "$75.00", 
      img: pj8,
      link: "/pajamas#card-3"
    },
  ];

  return (
    <div className="home-container">

      {/* HEADER */}
      <header className="site-header">
        <div className="logo"><Link to="/">Bloom & You</Link></div>
        <nav className="site-nav">
          <Link to="/products">Products</Link>
          <Link to="/customize">Customize</Link>
          <Link to="/account">Account</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-content-box">
          <h1 className="hero-title">Find Your Bloom</h1>
          <p className="hero-desc">
            Explore our customizable self-care collection. Click a category to view 
            ready-to-buy options, or customize directly!
          </p>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="product-grid-section">
        <div className="grid-container">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="card-image-box">
                <img src={product.img} alt={product.name} />
              </div>
              <div className="card-details">
                <div className="card-text-top">
                  <h3>{product.name}</h3>
                  {product.subtitle && (
                    <p className="subtitle">{product.subtitle}</p>
                  )}
                </div>
                <Link to="/customize" className="btn-customize-black">
                  {product.btn}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OUR STORY */}
      <section className="our-story-wrapper">
        <div className="our-story-grid">
          {/* UPDATED STYLING FOR CENTERED LAYOUT */}
          <div 
            className="story-pink-box" 
            style={{ 
              display: "flex", 
              flexDirection: "column", 
              justifyContent: "center", 
              alignItems: "center", 
              textAlign: "center", 
              padding: "20px" 
            }}
          >
            <h2 style={{ marginBottom: "15px" }}>our story</h2>
            <p style={{ fontSize: "0.95rem", lineHeight: "1.6", fontWeight: "400", maxWidth: "95%" }}>
              At Bloom & You, our journey didn’t start with a product; it started with a feeling. 
              We believe that true mindful self-care is found in the quiet moments between the noise. 
              That’s why our small, dedicated team builds every collection with deep intention and a passion for creativity.
            </p>
          </div>
          
          <div className="story-gray-box">
            <img src={os1} alt="Team making bouquets" />
          </div>
          <div className="story-gray-box">
            <img src={os2} alt="Behind the scenes candle making" />
          </div>
        </div>
      </section>

      {/* MOST SELLING */}
      <section className="most-selling-section">
        <h2>Most Selling Products</h2>
        <div className="selling-grid">
          {sellingProducts.map((item) => (
            <Link to={item.link} key={item.id} className="selling-card">
              <div className="selling-img-placeholder">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="selling-info">
                <h4>{item.name}</h4>
                <p>{item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-contact">
          <h3>contact us</h3>
          <div className="social-icons">
            <a href="https://www.instagram.com/bbloomandyou" target="_blank" rel="noopener noreferrer"><span>📷</span></a>
            <a href="https://pin.it/6PPIfHbEC" target="_blank" rel="noopener noreferrer"><span>📌</span></a>
            <a href="mailto:bloomandyou.social@gmail.com"><span>✉</span></a>
            <a href="https://www.linkedin.com/company/bloom-and-you/" target="_blank" rel="noopener noreferrer"><span>in</span></a>
            <a href="tel:03152795678"><span>📞</span></a>
            <Link to="/contact" title="Write to us"><span>📝</span></Link>
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