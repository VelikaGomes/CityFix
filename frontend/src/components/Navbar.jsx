import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/report", label: "Report Issue", icon: "📢" },
    { path: "/admin", label: "Admin", icon: "⚙️" },
  ];

  return (
    <nav style={{
      background: "white",
      borderBottom: "1px solid #f1f5f9",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      fontFamily: "system-ui, -apple-system, sans-serif",
    }}>
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "0 24px",
        height: "70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        {/* Logo/Brand */}
        <Link to="/" style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          textDecoration: "none",
        }}>
          <div style={{
            width: "36px",
            height: "36px",
            background: "linear-gradient(135deg, #3b82f6, #2563eb)",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "20px",
            transform: "rotate(-5deg)",
            boxShadow: "0 4px 10px rgba(37, 99, 235, 0.2)",
          }}>
            🏙️
          </div>
          <span style={{
            fontSize: "1.3rem",
            fontWeight: "600",
            color: "#0f172a",
            letterSpacing: "-0.5px",
          }}>
            CityFix
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div style={{
          display: "flex",
          gap: "8px",
          background: "#f8fafc",
          padding: "4px",
          borderRadius: "40px",
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "40px",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: "500",
                background: isActive(link.path) ? "white" : "transparent",
                color: isActive(link.path) ? "#3b82f6" : "#64748b",
                boxShadow: isActive(link.path) ? "0 2px 8px rgba(0,0,0,0.04)" : "none",
                transition: "all 0.2s ease",
              }}
            >
              <span style={{ fontSize: "1.1rem" }}>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        {/* User Menu / Actions */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}>
          <button style={{
            background: "none",
            border: "none",
            fontSize: "1.2rem",
            cursor: "pointer",
            padding: "8px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            color: "#64748b",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "#f1f5f9"}
          onMouseLeave={(e) => e.currentTarget.style.background = "none"}
          >
            <span>🔔</span>
            <span style={{
              position: "absolute",
              top: "4px",
              right: "4px",
              width: "8px",
              height: "8px",
              background: "#ef4444",
              borderRadius: "50%",
              border: "2px solid white",
            }} />
          </button>
          
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "4px 8px 4px 4px",
            borderRadius: "40px",
            background: "#f8fafc",
            cursor: "pointer",
          }}>
            <div style={{
              width: "32px",
              height: "32px",
              background: "linear-gradient(135deg, #3b82f6, #2563eb)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "1rem",
            }}>
              A
            </div>
            <span style={{
              fontSize: "0.9rem",
              fontWeight: "500",
              color: "#0f172a",
            }}>
              Admin
            </span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            borderRadius: "8px",
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "#f1f5f9"}
          onMouseLeave={(e) => e.currentTarget.style.background = "none"}
        >
          <div style={{
            width: "24px",
            height: "20px",
            position: "relative",
          }}>
            <span style={{
              position: "absolute",
              width: "100%",
              height: "2px",
              background: "#0f172a",
              top: isMobileMenuOpen ? "9px" : "0",
              transform: isMobileMenuOpen ? "rotate(45deg)" : "none",
              transition: "all 0.3s ease",
            }} />
            <span style={{
              position: "absolute",
              width: "100%",
              height: "2px",
              background: "#0f172a",
              top: "9px",
              opacity: isMobileMenuOpen ? 0 : 1,
              transition: "opacity 0.2s ease",
            }} />
            <span style={{
              position: "absolute",
              width: "100%",
              height: "2px",
              background: "#0f172a",
              top: isMobileMenuOpen ? "9px" : "18px",
              transform: isMobileMenuOpen ? "rotate(-45deg)" : "none",
              transition: "all 0.3s ease",
            }} />
          </div>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div style={{
          position: "fixed",
          top: "70px",
          left: 0,
          right: 0,
          background: "white",
          borderBottom: "1px solid #f1f5f9",
          padding: "16px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
          animation: "slideDown 0.3s ease",
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 16px",
                borderRadius: "12px",
                textDecoration: "none",
                fontSize: "1rem",
                fontWeight: "500",
                background: isActive(link.path) ? "#f8fafc" : "transparent",
                color: isActive(link.path) ? "#3b82f6" : "#0f172a",
                marginBottom: "4px",
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      )}

      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (max-width: 768px) {
            .desktop-nav {
              display: none;
            }
            .mobile-menu-button {
              display: block;
            }
          }
        `}
      </style>
    </nav>
  );
}

export default Navbar;