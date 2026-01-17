import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Customize from './pages/Customize';
import Cart from './pages/Cart';
import Account from './pages/Account';
import Checkout from './pages/Checkout';

// Import New Pages
import ScentedCandles from './pages/ScentedCandles';
import BathBombs from './pages/BathBombs';
import Pajamas from './pages/Pajamas';
import Skincare from './pages/Skincare';
import Bouquets from './pages/Bouquets';
import FaceMasks from './pages/FaceMasks';
import Contact from './pages/Contact'; // <--- NEW IMPORT

// --- NEW: Helper Component to handle Scrolling ---
function ScrollToAnchor() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there is a hash (like #card-2), scroll to it
    if (hash) {
      // Remove the '#' character to get the element ID
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        // Slight delay to ensure page is fully rendered before scrolling
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    } else {
      // If no hash, scroll to top
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <>
      {/* Activates the scrolling logic */}
      <ScrollToAnchor />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/customize" element={<Customize />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<Account />} />
        <Route path="/checkout" element={<Checkout />} />
        
        {/* NEW CONTACT ROUTE */}
        <Route path="/contact" element={<Contact />} />
        
        {/* New Product Category Routes */}
        <Route path="/scented-candles" element={<ScentedCandles />} />
        <Route path="/bath-bombs" element={<BathBombs />} />
        <Route path="/pajamas" element={<Pajamas />} />
        <Route path="/skincare" element={<Skincare />} />
        <Route path="/bouquets" element={<Bouquets />} />
        <Route path="/facemasks" element={<FaceMasks />} />
        
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;