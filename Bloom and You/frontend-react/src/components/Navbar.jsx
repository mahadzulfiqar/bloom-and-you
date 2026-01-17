import React from "react";
import { Link } from "react-router-dom";
import "../styles/main.css"; // Or separate Navbar styles

export default function Navbar() {
  return (
    <nav className="main-nav">
      <div className="brand">Bloom & You</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/customize">Customize</Link>
        <Link to="/account">Account</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </nav>
  );
}
