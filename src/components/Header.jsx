import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand-link" onClick={closeMobileMenu}>
          <img src="/logo.svg" alt="Aashi Pandey Logo" className="brand-logo-img" />
          <span>Aashi Pandey</span>
        </Link>

        <nav className={`main-nav ${mobileMenuOpen ? 'active' : ''}`} id="mainNav">
          <ul className="nav-links">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
                onClick={closeMobileMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
                onClick={closeMobileMenu}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/experience" 
                className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
                onClick={closeMobileMenu}
              >
                Experience
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/projects" 
                className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
                onClick={closeMobileMenu}
              >
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
                onClick={closeMobileMenu}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <Link to="/contact" className="cta-btn" onClick={closeMobileMenu}>Hire Me</Link>
          <button 
            className="mobile-toggle" 
            id="mobileToggle" 
            aria-label="Menu"
            onClick={toggleMobileMenu}
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>
    </header>
  );
}
