import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/report", label: "Report Issue", icon: "📢" },
    { path: "/admin", label: "Admin Dashboard", icon: "⚙️" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand */}
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🏙️</span>
          <span className="brand-text">CityFix</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${isActive(link.path) ? "active" : ""}`}
            >
              <span className="nav-icon">{link.icon}</span>
              <span className="nav-label">{link.label}</span>
              {isActive(link.path) && <span className="active-indicator" />}
            </Link>
          ))}
        </div>

        {/* User Menu / Actions */}
        <div className="nav-actions">
          <button className="icon-button">
            <span className="notification-badge">3</span>
            🔔
          </button>
          <div className="user-profile">
            <div className="avatar">👤</div>
            <span className="user-name">Admin</span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="hamburger">
            <span className={`hamburger-line ${isMobileMenuOpen ? "open" : ""}`} />
            <span className={`hamburger-line ${isMobileMenuOpen ? "open" : ""}`} />
            <span className={`hamburger-line ${isMobileMenuOpen ? "open" : ""}`} />
          </span>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`mobile-nav-link ${isActive(link.path) ? "active" : ""}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="nav-icon">{link.icon}</span>
            <span className="nav-label">{link.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;