import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

interface NavigationBarProps {
  className?: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ className = '' }) => {
  return (
    <nav className={`navbar ${className}`.trim()}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <h3>ShadiBiodata.com</h3>
        </Link>
        <div className="navbar-links">
          <Link to="/form" className="navbar-link">
            Create Biodata
          </Link>
          <Link to="/sandbox" className="navbar-link">
            Templates
          </Link>
          <a href="#features" className="navbar-link">
            Features
          </a>
          <a href="#how-it-works" className="navbar-link">
            How It Works
          </a>
          <a href="#testimonials" className="navbar-link">
            Reviews
          </a>
          <a href="#faq" className="navbar-link">
            FAQ
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
