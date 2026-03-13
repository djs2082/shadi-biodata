import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

interface NavigationBarProps {
  className?: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${className}`.trim()}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <h3>ShadiBiodata.com</h3>
        </Link>

        {/* Hamburger Menu Button */}
        <button
          className="navbar-hamburger"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className={isMobileMenuOpen ? 'active' : ''}></span>
          <span className={isMobileMenuOpen ? 'active' : ''}></span>
          <span className={isMobileMenuOpen ? 'active' : ''}></span>
        </button>

        {/* Navigation Links */}
        <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link to="/form" className="navbar-link" onClick={closeMobileMenu}>
            Create Biodata
          </Link>
          {/* Commenting this Part as we don't want to display it on UI */}
          {/* <Link to="/sandbox" className="navbar-link" onClick={closeMobileMenu}>
            Templates
          </Link> */}
          <Link
            to="/features"
            className="navbar-link"
            onClick={closeMobileMenu}
          >
            Features
          </Link>
          <Link
            to="/how-it-works"
            className="navbar-link"
            onClick={closeMobileMenu}
          >
            How It Works
          </Link>
          <a
            href="#testimonials"
            className="navbar-link"
            onClick={closeMobileMenu}
          >
            Reviews
          </a>
          <a href="#faq" className="navbar-link" onClick={closeMobileMenu}>
            FAQ
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
