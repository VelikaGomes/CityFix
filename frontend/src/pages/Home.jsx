import { useEffect } from "react";
import IssueCard from "../components/IssueCard";
import { Link } from "react-router-dom";
import { useIssues } from '../context/IssueContext';

function Home() {
  const { issues, loading, refreshIssues } = useIssues();

  useEffect(() => {
    refreshIssues();
  }, []);

  // Calculate stats from actual issues data
  const stats = {
    total: issues.length,
    pending: issues.filter(i => i.status === "Pending").length,
    inProgress: issues.filter(i => i.status === "In Progress").length,
    resolved: issues.filter(i => i.status === "Resolved").length,
  };

  // Sort issues by date (newest first) and take first 6 for recent issues
  const recentIssues = [...issues]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  return (
    <div style={{
      fontFamily: "system-ui, -apple-system, sans-serif",
      background: "#f8fafc",
    }}>
      {/* Hero Section */}
      <section style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "80px 24px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background Pattern */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          pointerEvents: "none",
        }} />
        
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "48px",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}>
          <div>
            <h1 style={{
              fontSize: "3.5rem",
              fontWeight: "700",
              color: "white",
              margin: "0 0 20px 0",
              lineHeight: "1.2",
              letterSpacing: "-0.02em",
            }}>
              Make Your City{" "}
              <span style={{
                background: "linear-gradient(135deg, #fff6b0, #ffd6a0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}>
                Better
              </span>
            </h1>
            <p style={{
              fontSize: "1.2rem",
              color: "rgba(255,255,255,0.9)",
              margin: "0 0 32px 0",
              lineHeight: "1.6",
            }}>
              Report and track community issues in real-time. Together, we can make our city cleaner, safer, and more beautiful.
            </p>
            <div style={{
              display: "flex",
              gap: "16px",
            }}>
              <Link to="/report" style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 32px",
                background: "white",
                color: "#667eea",
                textDecoration: "none",
                borderRadius: "40px",
                fontWeight: "600",
                fontSize: "1rem",
                transition: "all 0.2s ease",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              }}>
                <span>📢</span>
                Report an Issue
              </Link>
              <Link to="/map" style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 32px",
                background: "rgba(255,255,255,0.2)",
                color: "white",
                textDecoration: "none",
                borderRadius: "40px",
                fontWeight: "600",
                fontSize: "1rem",
                transition: "all 0.2s ease",
                backdropFilter: "blur(8px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              }}>
                <span>🗺️</span>
                View Map
              </Link>
            </div>
          </div>
          
          <div style={{
            position: "relative",
            height: "400px",
          }}>
            {["🏙️", "📍", "✅", "🔄"].map((icon, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  fontSize: "3rem",
                  background: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(8px)",
                  padding: "20px",
                  borderRadius: "30px",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                  animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
                  left: `${20 + index * 30}%`,
                  top: `${20 + index * 15}%`,
                }}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "60px 24px",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }}>
          {[
            { label: "Total Issues", value: stats.total, icon: "📋", color: "#667eea" },
            { label: "Pending", value: stats.pending, icon: "⏳", color: "#f59e0b" },
            { label: "In Progress", value: stats.inProgress, icon: "🔄", color: "#3b82f6" },
            { label: "Resolved", value: stats.resolved, icon: "✅", color: "#10b981" },
          ].map((stat, index) => (
            <div
              key={index}
              style={{
                background: "white",
                padding: "24px",
                borderRadius: "20px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                border: "1px solid #f1f5f9",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{
                width: "48px",
                height: "48px",
                background: `${stat.color}15`,
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
              }}>
                {stat.icon}
              </div>
              <div>
                <p style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "#0f172a",
                  margin: "0 0 4px 0",
                  lineHeight: 1,
                }}>{stat.value}</p>
                <p style={{
                  fontSize: "0.9rem",
                  color: "#64748b",
                  margin: 0,
                }}>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Issues Section */}
      <section style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 24px 60px",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
        }}>
          <div>
            <h2 style={{
              fontSize: "2rem",
              fontWeight: "600",
              color: "#0f172a",
              margin: "0 0 8px 0",
            }}>Recent Issues</h2>
            <p style={{
              fontSize: "1rem",
              color: "#64748b",
              margin: 0,
            }}>Latest reports from your community</p>
          </div>
          <Link to="/issues" style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            color: "#667eea",
            textDecoration: "none",
            fontSize: "0.95rem",
            fontWeight: "500",
            padding: "8px 16px",
            borderRadius: "30px",
            background: "#f1f5f9",
          }}>
            View All
            <span>→</span>
          </Link>
        </div>

        {loading ? (
          <div style={{
            textAlign: "center",
            padding: "60px",
          }}>
            <div style={{
              width: "40px",
              height: "40px",
              margin: "0 auto 20px",
              border: "3px solid #f1f5f9",
              borderTopColor: "#667eea",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }} />
            <p style={{ color: "#64748b" }}>Loading issues...</p>
          </div>
        ) : recentIssues.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "60px",
            background: "white",
            borderRadius: "24px",
            border: "1px solid #f1f5f9",
          }}>
            <div style={{
              fontSize: "3rem",
              marginBottom: "20px",
            }}>🏙️</div>
            <h3 style={{
              fontSize: "1.3rem",
              color: "#0f172a",
              margin: "0 0 8px 0",
            }}>No Issues Reported Yet</h3>
            <p style={{
              color: "#64748b",
              margin: "0 0 24px 0",
            }}>Be the first to report an issue in your community</p>
            <Link to="/report" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              background: "#667eea",
              color: "white",
              textDecoration: "none",
              borderRadius: "30px",
              fontWeight: "500",
            }}>
              Report an Issue
            </Link>
          </div>
        ) : (
          <>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: "24px",
            }}>
              {recentIssues.map(issue => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </div>

            {issues.length > 6 && (
              <div style={{
                textAlign: "center",
                marginTop: "40px",
              }}>
                <Link to="/issues" style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 32px",
                  background: "white",
                  color: "#0f172a",
                  textDecoration: "none",
                  borderRadius: "30px",
                  fontWeight: "500",
                  border: "1px solid #e2e8f0",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f8fafc";
                  e.currentTarget.style.borderColor = "#cbd5e1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                }}>
                  View All {issues.length} Issues
                </Link>
              </div>
            )}
          </>
        )}
      </section>

      {/* How It Works Section */}
      <section style={{
        background: "white",
        padding: "80px 24px",
        borderTop: "1px solid #f1f5f9",
        borderBottom: "1px solid #f1f5f9",
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}>
          <h2 style={{
            fontSize: "2rem",
            fontWeight: "600",
            color: "#0f172a",
            margin: "0 0 12px 0",
            textAlign: "center",
          }}>How It Works</h2>
          <p style={{
            fontSize: "1rem",
            color: "#64748b",
            margin: "0 0 48px 0",
            textAlign: "center",
          }}>Three simple steps to improve your community</p>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "30px",
          }}>
            {[
              { step: "1", icon: "📢", title: "Report Issue", desc: "Submit a report with photos and location of the problem" },
              { step: "2", icon: "🔄", title: "In Progress", desc: "Authorities review and assign the issue to relevant teams" },
              { step: "3", icon: "✅", title: "Get Resolved", desc: "Track progress and get notified when it's fixed" },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  textAlign: "center",
                  padding: "32px",
                  background: "#f8fafc",
                  borderRadius: "24px",
                  position: "relative",
                }}
              >
                <div style={{
                  width: "80px",
                  height: "80px",
                  background: "#667eea",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  fontSize: "32px",
                  color: "white",
                  position: "relative",
                }}>
                  <span style={{ position: "relative", zIndex: 1 }}>{item.icon}</span>
                </div>
                <h3 style={{
                  fontSize: "1.3rem",
                  color: "#0f172a",
                  margin: "0 0 12px 0",
                }}>{item.title}</h3>
                <p style={{
                  color: "#64748b",
                  margin: 0,
                  lineHeight: "1.6",
                }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "80px 24px",
        textAlign: "center",
      }}>
        <div style={{
          maxWidth: "600px",
          margin: "0 auto",
        }}>
          <h2 style={{
            fontSize: "2.5rem",
            fontWeight: "600",
            color: "white",
            margin: "0 0 16px 0",
          }}>Ready to make a difference?</h2>
          <p style={{
            fontSize: "1.1rem",
            color: "rgba(255,255,255,0.9)",
            margin: "0 0 32px 0",
            lineHeight: "1.6",
          }}>
            Join your community in making the city better, one report at a time.
          </p>
          <Link to="/report" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "16px 40px",
            background: "white",
            color: "#667eea",
            textDecoration: "none",
            borderRadius: "40px",
            fontWeight: "600",
            fontSize: "1.1rem",
            transition: "all 0.2s ease",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
          }}>
            Report an Issue Now
          </Link>
        </div>
      </section>

      {/* Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default Home;