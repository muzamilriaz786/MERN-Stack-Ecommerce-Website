import { useState, useEffect } from "react";
import { FiShoppingBag, FiUser, FiMenu, FiX } from "react-icons/fi";
import { FaPepperHot } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/navbar.css"; // Create this CSS file for styling

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo/Brand */}
        <div className="navbar-brand">
          <FaPepperHot className="brand-icon" />
          <Link to="/" className="brand-name">
            Perfume
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-links">
          <Link to="/home" className="nav-link">
            Home
          </Link>
          <Link to="/shopping" className="nav-link">
            Shopping
          </Link>
          <Link to="/perfumes" className="nav-link">
            Perfume List
          </Link>
          <div className="nav-icons">
            <Link to="/cart" className="icon-link">
              <FiShoppingBag />
              <span className="cart-count">0</span>
            </Link>
            <Link to="/login" className="icon-link">
              <FiUser />
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-button" onClick={toggleMenu}>
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <Link to="/home" className="mobile-nav-link" onClick={toggleMenu}>
          Home
        </Link>
        <Link to="/shopping" className="mobile-nav-link" onClick={toggleMenu}>
          Shopping
        </Link>
        <Link to="/perfumes" className="mobile-nav-link" onClick={toggleMenu}>
          Perfume List
        </Link>
        <div className="mobile-auth-links">
          <Link
            to="/login"
            className="mobile-nav-link auth-link"
            onClick={toggleMenu}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="mobile-nav-link auth-link signup"
            onClick={toggleMenu}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};
