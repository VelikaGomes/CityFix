// pages/About.jsx
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function About() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [stats, setStats] = useState({
    totalIssues: 0,
    pendingIssues: 0,
    inProgressIssues: 0,
    resolvedIssues: 0,
    activeUsers: 0,
    citiesCovered: 0
  });

  // Simulate fetching stats
  useEffect(() => {
    // In a real app, you'd fetch this from your API
    setStats({
      totalIssues: 1247,
      pendingIssues: 423,
      inProgressIssues: 512,
      resolvedIssues: 312,
      activeUsers: 2856,
      citiesCovered: 12
    });
  }, []);

  const features = [
    {
      icon: "🏠",
      title: "View Issues",
      description: "Browse all reported issues in your community with detailed cards showing title, description, status, and location.",
      details: [
        "Comprehensive issue cards with key information",
        "Real-time status updates",
        "Location-based viewing",
        "Summary statistics dashboard"
      ]
    },
    {
      icon: "📢",
      title: "Report an Issue",
      description: "Easily report community problems with our intuitive form. Include all necessary details for quick resolution.",
      details: [
        "Issue title and detailed description",
        "Location pinning and address",
        "Category selection (Roads, Lighting, Sanitation, etc.)",
        "Priority level setting",
        "Optional contact information"
      ]
    },
    {
      icon: "🔍",
      title: "View Details",
      description: "Click on any issue to see complete information, including status history and community comments.",
      details: [
        "Full issue description",
        "Status update timeline",
        "Community discussion and comments",
        "Location details and map view",
        "Photo attachments"
      ]
    },
    {
      icon: "🗺️",
      title: "Map View",
      description: "Visualize all issues on an interactive map with clickable markers showing key information.",
      details: [
        "Interactive map interface",
        "Color-coded markers by status",
        "Quick issue preview on marker click",
        "Geographic distribution view",
        "Zoom and pan functionality"
      ]
    }
  ];

  const adminFeatures = [
    {
      icon: "⚙️",
      title: "Status Management",
      description: "Admin users can efficiently manage issue statuses and track progress.",
      details: [
        "Update issue status (Pending, In Progress, Resolved)",
        "Add administrative comments",
        "Track resolution time",
        "Assign issues to departments"
      ]
    },
    {
      icon: "🔎",
      title: "Filter & Search",
      description: "Powerful tools for admins to find and manage issues quickly.",
      details: [
        "Filter by status, category, or priority",
        "Search by title, description, or location",
        "Sort by date, status, or urgency",
        "Export data for reporting"
      ]
    },
    {
      icon: "📊",
      title: "Admin Dashboard",
      description: "Comprehensive dashboard with analytics and management tools.",
      details: [
        "Issue statistics and trends",
        "Performance metrics",
        "User activity monitoring",
        "System health overview"
      ]
    }
  ];

  const userFlowSteps = [
    {
      role: "Regular User",
      steps: [
        "👀 Browse issues on the home page",
        "🔍 Click any issue to view details",
        "📝 Report a new issue using the form",
        "📍 Track your reported issues",
        "💬 Comment on community issues"
      ],
      color: "#3b82f6",
      bgColor: "#eff6ff"
    },
    {
      role: "Admin User",
      steps: [
        "📊 Access admin dashboard",
        "📋 View all issues in table format",
        "🔎 Filter and search issues",
        "🔄 Update issue statuses",
        "💭 Add administrative comments"
      ],
      color: "#ef4444",
      bgColor: "#fef2f2"
    }
  ];

  const faqs = [
    {
      question: "How do I report an issue?",
      answer: "Click on the 'Report Issue' button in the navigation bar. Fill out the form with details about the problem, including title, description, location, and category. You can also add optional contact information if you'd like to receive updates."
    },
    {
      question: "Who can see my reported issues?",
      answer: "All reported issues are public and can be viewed by anyone visiting the site. This transparency helps build community awareness and accountability. However, your personal contact information remains private."
    },
    {
      question: "How are issues resolved?",
      answer: "Issues go through a workflow: 'Pending' (newly reported), 'In Progress' (being addressed), and 'Resolved' (completed). Admin users manage these statuses and can add comments about progress."
    },
    {
      question: "Can I track my reported issues?",
      answer: "Yes! You can view all issues you've reported in your profile page. You'll also receive updates when the status of your reported issues changes."
    },
    {
      question: "How does the map view work?",
      answer: "The map view shows all reported issues as color-coded markers. Each marker indicates the issue's status. Click on any marker to see a preview of the issue and click through for full details."
    },
    {
      question: "Is there a mobile app?",
      answer: "Currently, CityFix is a web application optimized for all devices. You can access it from your phone's browser, and it will work just like a native app!"
    }
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div style={{
      minHeight: "calc(100vh - 70px)",
      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
      fontFamily: "system-ui, -apple-system, sans-serif",
    }}>
      {/* Hero Section */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        color: "white",
        padding: "80px 24px",
        textAlign: "center",
      }}>
        <div style={{
          maxWidth: "800px",
          margin: "0 auto",
        }}>
          <div style={{
            fontSize: "4rem",
            marginBottom: "20px",
            animation: "bounce 2s infinite",
          }}>
            🏙️
          </div>
          <h1 style={{
            fontSize: "3.5rem",
            fontWeight: "700",
            margin: "0 0 20px 0",
            letterSpacing: "-0.02em",
            background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            About CityFix
          </h1>
          <p style={{
            fontSize: "1.2rem",
            lineHeight: "1.6",
            color: "#cbd5e1",
            margin: "0 0 30px 0",
          }}>
            Empowering communities to report, track, and resolve local issues together.
            CityFix bridges the gap between citizens and administrators for a better tomorrow.
          </p>
          <div style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
          }}>
            <Link
              to="/report"
              style={{
                padding: "12px 28px",
                background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                color: "white",
                textDecoration: "none",
                borderRadius: "40px",
                fontSize: "1rem",
                fontWeight: "500",
                boxShadow: "0 4px 15px rgba(59, 130, 246, 0.4)",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              Report an Issue
            </Link>
            <Link
              to="/"
              style={{
                padding: "12px 28px",
                background: "rgba(255,255,255,0.1)",
                color: "white",
                textDecoration: "none",
                borderRadius: "40px",
                fontSize: "1rem",
                fontWeight: "500",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              View Issues
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "60px 24px",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "20px",
        }}>
          <div style={{
            background: "white",
            borderRadius: "20px",
            padding: "30px 20px",
            textAlign: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
            border: "1px solid #f1f5f9",
          }}>
            <div style={{
              fontSize: "2.5rem",
              marginBottom: "10px",
            }}>📋</div>
            <div style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#0f172a",
              marginBottom: "5px",
            }}>{stats.totalIssues}</div>
            <div style={{
              fontSize: "0.9rem",
              color: "#64748b",
            }}>Total Issues</div>
          </div>

          <div style={{
            background: "white",
            borderRadius: "20px",
            padding: "30px 20px",
            textAlign: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
            border: "1px solid #f1f5f9",
          }}>
            <div style={{
              fontSize: "2.5rem",
              marginBottom: "10px",
            }}>⏳</div>
            <div style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#92400e",
              marginBottom: "5px",
            }}>{stats.pendingIssues}</div>
            <div style={{
              fontSize: "0.9rem",
              color: "#64748b",
            }}>Pending</div>
          </div>

          <div style={{
            background: "white",
            borderRadius: "20px",
            padding: "30px 20px",
            textAlign: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
            border: "1px solid #f1f5f9",
          }}>
            <div style={{
              fontSize: "2.5rem",
              marginBottom: "10px",
            }}>⚙️</div>
            <div style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#1e40af",
              marginBottom: "5px",
            }}>{stats.inProgressIssues}</div>
            <div style={{
              fontSize: "0.9rem",
              color: "#64748b",
            }}>In Progress</div>
          </div>

          <div style={{
            background: "white",
            borderRadius: "20px",
            padding: "30px 20px",
            textAlign: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
            border: "1px solid #f1f5f9",
          }}>
            <div style={{
              fontSize: "2.5rem",
              marginBottom: "10px",
            }}>✅</div>
            <div style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#065f46",
              marginBottom: "5px",
            }}>{stats.resolvedIssues}</div>
            <div style={{
              fontSize: "0.9rem",
              color: "#64748b",
            }}>Resolved</div>
          </div>

          <div style={{
            background: "white",
            borderRadius: "20px",
            padding: "30px 20px",
            textAlign: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
            border: "1px solid #f1f5f9",
          }}>
            <div style={{
              fontSize: "2.5rem",
              marginBottom: "10px",
            }}>👥</div>
            <div style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#7e22ce",
              marginBottom: "5px",
            }}>{stats.activeUsers}</div>
            <div style={{
              fontSize: "0.9rem",
              color: "#64748b",
            }}>Active Users</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 24px 60px",
      }}>
        <h2 style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          color: "#0f172a",
          textAlign: "center",
          margin: "0 0 16px 0",
        }}>
          Key Features
        </h2>
        <p style={{
          fontSize: "1.1rem",
          color: "#475569",
          textAlign: "center",
          maxWidth: "600px",
          margin: "0 auto 48px",
        }}>
          Everything you need to report and track community issues effectively
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px",
        }}>
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                background: "white",
                borderRadius: "24px",
                padding: "32px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
                border: "1px solid #f1f5f9",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.02)";
              }}
            >
              <div style={{
                fontSize: "3rem",
                marginBottom: "20px",
              }}>{feature.icon}</div>
              <h3 style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "#0f172a",
                margin: "0 0 12px 0",
              }}>{feature.title}</h3>
              <p style={{
                fontSize: "0.95rem",
                color: "#475569",
                lineHeight: "1.6",
                margin: "0 0 20px 0",
              }}>{feature.description}</p>
              <ul style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}>
                {feature.details.map((detail, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 0",
                      fontSize: "0.9rem",
                      color: "#64748b",
                      borderBottom: i < feature.details.length - 1 ? "1px solid #f1f5f9" : "none",
                    }}
                  >
                    <span style={{ color: "#3b82f6" }}>✓</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Admin Features Section */}
      <div style={{
        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
        padding: "80px 24px",
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}>
          <h2 style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "white",
            textAlign: "center",
            margin: "0 0 16px 0",
          }}>
            Admin Capabilities
          </h2>
          <p style={{
            fontSize: "1.1rem",
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: "600px",
            margin: "0 auto 48px",
          }}>
            Powerful tools for administrators to manage and resolve issues efficiently
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px",
          }}>
            {adminFeatures.map((feature, index) => (
              <div
                key={index}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "24px",
                  padding: "32px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div style={{
                  fontSize: "3rem",
                  marginBottom: "20px",
                }}>{feature.icon}</div>
                <h3 style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "white",
                  margin: "0 0 12px 0",
                }}>{feature.title}</h3>
                <p style={{
                  fontSize: "0.95rem",
                  color: "#cbd5e1",
                  lineHeight: "1.6",
                  margin: "0 0 20px 0",
                }}>{feature.description}</p>
                <ul style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                }}>
                  {feature.details.map((detail, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 0",
                        fontSize: "0.9rem",
                        color: "#94a3b8",
                        borderBottom: i < feature.details.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
                      }}
                    >
                      <span style={{ color: "#60a5fa" }}>✓</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Flow Section */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "80px 24px",
      }}>
        <h2 style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          color: "#0f172a",
          textAlign: "center",
          margin: "0 0 48px 0",
        }}>
          How It Works
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px",
        }}>
          {userFlowSteps.map((flow, index) => (
            <div
              key={index}
              style={{
                background: "white",
                borderRadius: "24px",
                padding: "32px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
                border: "1px solid #f1f5f9",
              }}
            >
              <h3 style={{
                fontSize: "1.8rem",
                fontWeight: "600",
                color: flow.color,
                margin: "0 0 24px 0",
                padding: "0 0 16px 0",
                borderBottom: `2px solid ${flow.bgColor}`,
              }}>
                {flow.role}
              </h3>
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}>
                {flow.steps.map((step, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px",
                      background: flow.bgColor,
                      borderRadius: "12px",
                      fontSize: "0.95rem",
                      color: "#0f172a",
                    }}
                  >
                    <span style={{
                      width: "24px",
                      height: "24px",
                      background: flow.color,
                      color: "white",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                    }}>
                      {i + 1}
                    </span>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div style={{
        background: "#f8fafc",
        padding: "80px 24px",
        borderTop: "1px solid #e2e8f0",
        borderBottom: "1px solid #e2e8f0",
      }}>
        <div style={{
          maxWidth: "800px",
          margin: "0 auto",
        }}>
          <h2 style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "#0f172a",
            textAlign: "center",
            margin: "0 0 16px 0",
          }}>
            Frequently Asked Questions
          </h2>
          <p style={{
            fontSize: "1.1rem",
            color: "#475569",
            textAlign: "center",
            margin: "0 0 48px 0",
          }}>
            Got questions? We've got answers.
          </p>

          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                style={{
                  background: "white",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  style={{
                    width: "100%",
                    padding: "20px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: "#0f172a",
                    textAlign: "left",
                  }}
                >
                  {faq.question}
                  <span style={{
                    fontSize: "1.2rem",
                    color: "#3b82f6",
                    transform: activeFaq === index ? "rotate(180deg)" : "none",
                    transition: "transform 0.3s ease",
                  }}>
                    ▼
                  </span>
                </button>
                {activeFaq === index && (
                  <div style={{
                    padding: "0 24px 20px 24px",
                    color: "#475569",
                    fontSize: "0.95rem",
                    lineHeight: "1.6",
                    borderTop: "1px solid #f1f5f9",
                    marginTop: "8px",
                    paddingTop: "20px",
                  }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technology Section */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "80px 24px",
      }}>
        <h2 style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          color: "#0f172a",
          textAlign: "center",
          margin: "0 0 48px 0",
        }}>
          Built With Modern Technology
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}>
          {[
            { name: "React", icon: "⚛️", desc: "Frontend library for building user interfaces" },
            { name: "MySQL", icon: "🗄️", desc: "Reliable database for persistent data storage" },
            { name: "Node.js", icon: "🟢", desc: "JavaScript runtime for backend services" },
            { name: "Map Integration", icon: "🗺️", desc: "Interactive maps for issue visualization" },
          ].map((tech, index) => (
            <div
              key={index}
              style={{
                background: "linear-gradient(135deg, #ffffff, #fafcff)",
                borderRadius: "16px",
                padding: "24px",
                textAlign: "center",
                border: "1px solid #f1f5f9",
              }}
            >
              <div style={{
                fontSize: "3rem",
                marginBottom: "16px",
              }}>{tech.icon}</div>
              <h3 style={{
                fontSize: "1.2rem",
                fontWeight: "600",
                color: "#0f172a",
                margin: "0 0 8px 0",
              }}>{tech.name}</h3>
              <p style={{
                fontSize: "0.9rem",
                color: "#64748b",
                margin: 0,
              }}>{tech.desc}</p>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: "48px",
          padding: "32px",
          background: "#f8fafc",
          borderRadius: "24px",
          border: "1px solid #e2e8f0",
        }}>
          <p style={{
            fontSize: "1rem",
            color: "#475569",
            lineHeight: "1.8",
            margin: 0,
            textAlign: "center",
          }}>
            <strong style={{ color: "#0f172a" }}>Data Storage:</strong> All issues, comments, and user data are securely stored in a MySQL database, ensuring your information persists even after application restarts. This reliable storage system maintains the complete history of all community issues and their resolution progress.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        background: "linear-gradient(135deg, #3b82f6, #2563eb)",
        padding: "80px 24px",
        textAlign: "center",
      }}>
        <div style={{
          maxWidth: "600px",
          margin: "0 auto",
        }}>
          <h2 style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "white",
            margin: "0 0 20px 0",
          }}>
            Ready to Make a Difference?
          </h2>
          <p style={{
            fontSize: "1.1rem",
            color: "rgba(255,255,255,0.9)",
            margin: "0 0 30px 0",
          }}>
            Join your community in reporting and resolving local issues. Every report counts!
          </p>
          <div style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
          }}>
            <Link
              to="/signup"
              style={{
                padding: "14px 32px",
                background: "white",
                color: "#3b82f6",
                textDecoration: "none",
                borderRadius: "40px",
                fontSize: "1rem",
                fontWeight: "600",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              Get Started
            </Link>
            <Link
              to="/"
              style={{
                padding: "14px 32px",
                background: "transparent",
                color: "white",
                textDecoration: "none",
                borderRadius: "40px",
                fontSize: "1rem",
                fontWeight: "500",
                border: "2px solid rgba(255,255,255,0.3)",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              Browse Issues
            </Link>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          @media (max-width: 768px) {
            h1 {
              font-size: 2.5rem !important;
            }
            h2 {
              font-size: 2rem !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default About;