import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/contact.css"; 

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      // Using the URL from your snippet:
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setStatus("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("❌ Failed to send message");
      }
    } catch (error) {
      console.error(error);
      setStatus("❌ Server error");
    }
  };

  return (
    <div className="contact-page-container">
      
      {/* SHARED HEADER */}
      <header className="site-header">
        <div className="logo"><Link to="/">Bloom & You</Link></div>
        <nav className="site-nav">
          <Link to="/products">Products</Link>
          <Link to="/customize">Customize</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/account">Account</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>

      {/* CONTACT FORM SECTION */}
      <div className="contact-body">
        <div className="contact-card">
          <h1>Contact Us</h1>
          <p className="contact-subtitle">We'd love to hear from you. Send us a message directly.</p>

          <form onSubmit={handleSubmit} className="contact-form-styled">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
              />
            </div>

            <button type="submit" className="btn-send-black">Send Message</button>
          </form>

          {status && <p className="status-message">{status}</p>}
        </div>
      </div>

      {/* SHARED FOOTER */}
      <footer className="site-footer">
        <div className="footer-contact">
          <h3>contact us</h3>
          <div className="social-icons">
            <a href="https://www.instagram.com/bbloomandyou" target="_blank" rel="noopener noreferrer"><span>📷</span></a>
            <a href="https://pin.it/6PPIfHbEC" target="_blank" rel="noopener noreferrer"><span>📌</span></a>
            <a href="mailto:bloomandyou.social@gmail.com"><span>✉️</span></a>
            <a href="https://www.linkedin.com/company/bloom-and-you/" target="_blank" rel="noopener noreferrer"><span>in</span></a>
            <a href="tel:03152795678"><span>📞</span></a>
            <a href="#"><span>f</span></a>
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