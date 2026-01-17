import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { useCart } from "../context/CartContext";
import "../styles/account.css";

export default function Account() {
  const { cartItems } = useCart();
  const navigate = useNavigate(); // new

  // UI STATE
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  // FORM STATE
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // ERROR & STATUS
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  // TAB SWITCH
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setErrors({});
    setStatus("");
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  // VALIDATION
  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (activeTab === "signup") {
      if (!formData.name) {
        tempErrors.name = "Name is required";
        isValid = false;
      }
      if (formData.password !== formData.confirmPassword) {
        tempErrors.confirmPassword = "Passwords do not match";
        isValid = false;
      }
    }

    setErrors(tempErrors);
    return isValid;
  };

  // SUBMIT HANDLER (API INTEGRATED)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // SIGN UP → API CALL
    if (activeTab === "signup") {
      setStatus("Creating account...");

      try {
        const response = await fetch("http://localhost:5000/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password
          })
        });

        const data = await response.json();

        if (data.success) {
          setStatus("✅ Account created successfully!");
          setFormData({ name: "", email: "", password: "", confirmPassword: "" });
          setActiveTab("login");
        } else {
          setStatus("❌ " + data.message);
        }
      } catch (error) {
        setStatus("❌ Server error. Try again later.");
      }
    }

    // LOGIN → API CALL
    if (activeTab === "login") {
      setStatus("Logging in...");

      try {
        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });

        const data = await response.json();

        if (data.success) {
          setStatus(`✅ Login successful. Welcome ${data.user.name}`);
          localStorage.setItem("user", JSON.stringify(data.user));

          // Dispatch storage event so Cart or other components can respond
          window.dispatchEvent(new Event("storage"));

          // Clear password
          setFormData({ ...formData, password: "" });

          // ✅ Redirect to cart so user can continue checkout
          navigate("/cart");
        } else {
          setStatus(`❌ ${data.message}`);
          setFormData({ ...formData, password: "" });
        }
      } catch (error) {
        setStatus("❌ Server error. Try again later.");
      }
    }
  };

  return (
    <div className="account-container">
      {/* HEADER */}
      <header className="site-header">
        <div className="logo"><Link to="/">Bloom & You</Link></div>
        <nav className="site-nav">
          <Link to="/products">Products</Link>
          <Link to="/customize">Customize</Link>
          <Link to="/account" className="nav-pill">Account</Link>
          <Link to="/cart">Cart ({cartItems.length})</Link>
        </nav>
      </header>

      {/* AUTH SECTION */}
      <div className="account-wrapper">
        <div className="auth-card">
          <div className="auth-tabs">
            <button
              className={`auth-tab ${activeTab === "login" ? "active" : ""}`}
              onClick={() => handleTabSwitch("login")}
            >
              Login
            </button>
            <button
              className={`auth-tab ${activeTab === "signup" ? "active" : ""}`}
              onClick={() => handleTabSwitch("signup")}
            >
              Sign Up
            </button>
          </div>

          <div className="auth-body">
            <h2 className="auth-title">
              {activeTab === "login" ? "Welcome Back" : "Create Account"}
            </h2>

            <form onSubmit={handleSubmit}>
              {activeTab === "signup" && (
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <span className="error-msg">{errors.name}</span>}
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="error-msg">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="form-input"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <span
                    className="password-toggle-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "👁️" : "🙈"}
                  </span>
                </div>
                {errors.password && <span className="error-msg">{errors.password}</span>}
              </div>

              {activeTab === "signup" && (
                <div className="form-group">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-input"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <span className="error-msg">{errors.confirmPassword}</span>
                  )}
                </div>
              )}

              {activeTab === "login" && (
                <a href="#" className="forgot-password">Forgot Password?</a>
              )}

              <button type="submit" className="btn-auth">
                {activeTab === "login" ? "Sign In" : "Create Account"}
              </button>

              {status && <p className="status-msg">{status}</p>}
            </form>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="site-footer">
        <span>© 2025 Bloom & You | Handcrafted in Pakistan</span>
      </footer>
    </div>
  );
}
