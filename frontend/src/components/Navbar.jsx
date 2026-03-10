import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/report", label: "Report Issue", icon: "📢" },
    ...(user?.role === 'admin' ? [{ path: "/admin", label: "Admin", icon: "⚙️" }] : []),
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowUserMenu(false);
  };

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
          position: "relative",
        }}>
          {user ? (
            <>
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
              
              <div 
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "4px 8px 4px 4px",
                  borderRadius: "40px",
                  background: "#f8fafc",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <div style={{
                  width: "32px",
                  height: "32px",
                  background: user?.role === 'admin' 
                    ? "linear-gradient(135deg, #ef4444, #dc2626)" 
                    : "linear-gradient(135deg, #3b82f6, #2563eb)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "1rem",
                }}>
                  {user?.name?.[0] || 'A'}
                </div>
                <span style={{
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  color: "#0f172a",
                }}>
                  {user?.name || 'Admin'}
                </span>
                <span style={{
                  fontSize: "0.8rem",
                  color: "#64748b",
                  marginLeft: "4px",
                }}>▼</span>
              </div>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  marginTop: "8px",
                  background: "white",
                  borderRadius: "16px",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                  border: "1px solid #f1f5f9",
                  minWidth: "200px",
                  zIndex: 1000,
                  animation: "slideDown 0.2s ease",
                }}>
                  <div style={{
                    padding: "12px 16px",
                    borderBottom: "1px solid #f1f5f9",
                  }}>
                    <p style={{
                      margin: "0 0 4px 0",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      color: "#0f172a",
                    }}>{user?.name}</p>
                    <p style={{
                      margin: 0,
                      fontSize: "0.8rem",
                      color: "#64748b",
                    }}>{user?.email}</p>
                    {user?.role === 'admin' && (
                      <span style={{
                        display: "inline-block",
                        marginTop: "4px",
                        padding: "2px 8px",
                        background: "#fee2e2",
                        color: "#b91c1c",
                        borderRadius: "30px",
                        fontSize: "0.7rem",
                        fontWeight: "600",
                      }}>ADMIN</span>
                    )}
                  </div>
                  
                  {user?.role === 'admin' && (
                    <Link to="/admin" style={{
                      display: "block",
                      padding: "12px 16px",
                      textDecoration: "none",
                      color: "#0f172a",
                      fontSize: "0.9rem",
                      transition: "background 0.2s ease",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "white"}
                    onClick={() => setShowUserMenu(false)}>
                      ⚙️ Admin Dashboard
                    </Link>
                  )}
                  
                  <Link to="/profile" style={{
                    display: "block",
                    padding: "12px 16px",
                    textDecoration: "none",
                    color: "#0f172a",
                    fontSize: "0.9rem",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "white"}
                  onClick={() => setShowUserMenu(false)}>
                    👤 My Profile
                  </Link>
                  
                  <Link to="/settings" style={{
                    display: "block",
                    padding: "12px 16px",
                    textDecoration: "none",
                    color: "#0f172a",
                    fontSize: "0.9rem",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "white"}
                  onClick={() => setShowUserMenu(false)}>
                    ⚙️ Settings
                  </Link>
                  
                  <div style={{
                    borderTop: "1px solid #f1f5f9",
                    margin: "4px 0",
                  }} />
                  
                  <button
                    onClick={handleLogout}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      width: "100%",
                      padding: "12px 16px",
                      border: "none",
                      background: "none",
                      textAlign: "left",
                      fontSize: "0.9rem",
                      color: "#ef4444",
                      cursor: "pointer",
                      transition: "background 0.2s ease",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#fef2f2"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                  >
                    <span>🚪</span>
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div style={{
              display: "flex",
              gap: "8px",
            }}>
              <Link to="/login" style={{
                padding: "8px 16px",
                borderRadius: "30px",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: "500",
                color: "#3b82f6",
                background: "#eff6ff",
              }}>
                Login
              </Link>
              <Link to="/signup" style={{
                padding: "8px 16px",
                borderRadius: "30px",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: "500",
                color: "white",
                background: "linear-gradient(135deg, #3b82f6, #2563eb)",
              }}>
                Sign Up
              </Link>
            </div>
          )}
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
          zIndex: 999,
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
          
          {user ? (
            <>
              <div style={{
                borderTop: "1px solid #f1f5f9",
                margin: "16px 0",
              }} />
              
              <div style={{
                padding: "14px 16px",
                background: "#f8fafc",
                borderRadius: "12px",
                marginBottom: "8px",
              }}>
                <p style={{
                  margin: "0 0 4px 0",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  color: "#0f172a",
                }}>{user?.name}</p>
                <p style={{
                  margin: 0,
                  fontSize: "0.8rem",
                  color: "#64748b",
                }}>{user?.email}</p>
                {user?.role === 'admin' && (
                  <span style={{
                    display: "inline-block",
                    marginTop: "4px",
                    padding: "2px 8px",
                    background: "#fee2e2",
                    color: "#b91c1c",
                    borderRadius: "30px",
                    fontSize: "0.7rem",
                    fontWeight: "600",
                  }}>ADMIN</span>
                )}
              </div>
              
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  width: "100%",
                  padding: "14px 16px",
                  border: "none",
                  background: "transparent",
                  textAlign: "left",
                  fontSize: "1rem",
                  fontWeight: "500",
                  color: "#ef4444",
                  cursor: "pointer",
                  borderRadius: "12px",
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>🚪</span>
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <div style={{
                borderTop: "1px solid #f1f5f9",
                margin: "16px 0",
              }} />
              
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "14px 16px",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: "500",
                  color: "#3b82f6",
                  background: "#eff6ff",
                  borderRadius: "12px",
                  marginBottom: "8px",
                }}
              >
                Login
              </Link>
              
              <Link
                to="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "14px 16px",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: "500",
                  color: "white",
                  background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                  borderRadius: "12px",
                }}
              >
                Sign Up
              </Link>
            </>
          )}
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