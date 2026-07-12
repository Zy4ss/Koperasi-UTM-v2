import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartCount, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollWidth, setScrollWidth] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const sy = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      setIsScrolled(sy > 50);
      setScrollWidth(docHeight > 0 ? (sy / docHeight) * 100 : 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when navigation happens
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // If in admin dashboard, we show different navigation or handle dashboard layouts.
  // The user approved showing dashboard separately, but let's hide navbar for admin routes.
  const isAdminRoute = location.pathname.startsWith('/admin');
  if (isAdminRoute) return null;

  return (
    <>
      <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
        <div className="nav-inner container">
          <Link to="/" className="nav-logo">
            <img src="/img/logo-koperasi.png" alt="Koperasi UTM" className="nav-logo-img" /> Koperasi UTM
          </Link>
          <div id="nav-menu" className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <ul className="nav-menu-list">
              <li>
                <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Beranda
                </NavLink>
              </li>
              <li>
                <NavLink to="/profil" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Profil
                </NavLink>
              </li>
              <li>
                <NavLink to="/katalog" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Katalog
                </NavLink>
              </li>
              <li>
                <NavLink to="/kontak" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Kontak
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="nav-actions">
            <button className="cart-btn" aria-label="Keranjang" onClick={openCart}>
              <i className="fas fa-shopping-bag"></i>
              <span className={`cart-badge ${cartCount > 0 ? 'show' : ''}`}>{cartCount}</span>
            </button>
            <button 
              id="hamburger" 
              className={`hamburger ${isMenuOpen ? 'active' : ''}`} 
              aria-label="Menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>
      <div id="scroll-bar" className="scroll-bar" style={{ width: `${scrollWidth}%` }}></div>
    </>
  );
};

export default Navbar;
