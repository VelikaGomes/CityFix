// pages/Profile.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Added useLocation

function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Now properly imported
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'overview');
  const [userReports, setUserReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    notifications: {
      email: true,
      push: false,
      sms: false
    }
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate fetching user's reports
    const fetchUserReports = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      setUserReports([
        {
          id: 1,
          title: "Pothole on Main Street",
          category: "Roads",
          status: "in-progress",
          date: "2024-03-15",
          description: "Large pothole causing traffic issues",
          image: "https://via.placeholder.com/100",
          votes: 12,
          comments: 3
        },
        {
          id: 2,
          title: "Broken Street Light",
          category: "Lighting",
          status: "pending",
          date: "2024-03-10",
          description: "Street light not working for a week",
          image: "https://via.placeholder.com/100",
          votes: 5,
          comments: 1
        },
        {
          id: 3,
          title: "Garbage Collection Issue",
          category: "Sanitation",
          status: "resolved",
          date: "2024-03-05",
          description: "Missed garbage collection",
          image: "https://via.placeholder.com/100",
          votes: 8,
          comments: 2
        }
      ]);
      setIsLoading(false);
    };

    fetchUserReports();
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending':
        return { bg: '#fef3c7', color: '#92400e' };
      case 'in-progress':
        return { bg: '#dbeafe', color: '#1e40af' };
      case 'resolved':
        return { bg: '#d1fae5', color: '#065f46' };
      default:
        return { bg: '#f3f4f6', color: '#374151' };
    }
  };

  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'U';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (type) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (API call to update user profile)
    console.log('Updated profile:', formData);
    setIsEditing(false);
    // Show success message
    alert('Profile updated successfully!');
  };

  if (!user) {
    return null;
  }

  return (
    <div style={{
      minHeight: "calc(100vh - 70px)",
      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
      padding: "40px 24px",
      fontFamily: "system-ui, -apple-system, sans-serif",
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
      }}>
        {/* Header */}
        <div style={{
          marginBottom: "32px",
        }}>
          <h1 style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "#0f172a",
            margin: "0 0 8px 0",
            letterSpacing: "-0.02em",
          }}>
            My Profile
          </h1>
          <p style={{
            fontSize: "1.1rem",
            color: "#475569",
            margin: 0,
          }}>
            Manage your account and track your reported issues
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          gap: "24px",
        }}>
          {/* Sidebar */}
          <div>
            <div style={{
              background: "white",
              borderRadius: "24px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
              border: "1px solid #f1f5f9",
              overflow: "hidden",
            }}>
              {/* Profile Card */}
              <div style={{
                padding: "32px 24px",
                textAlign: "center",
                borderBottom: "1px solid #f1f5f9",
                background: "linear-gradient(135deg, #ffffff 0%, #fafcff 100%)",
              }}>
                <div style={{
                  width: "100px",
                  height: "100px",
                  margin: "0 auto 16px",
                  background: user?.role === 'admin' 
                    ? "linear-gradient(135deg, #ef4444, #dc2626)" 
                    : "linear-gradient(135deg, #3b82f6, #2563eb)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "2.5rem",
                  fontWeight: "600",
                  boxShadow: "0 8px 20px rgba(37, 99, 235, 0.2)",
                  border: "4px solid white",
                }}>
                  {getInitials(user?.name)}
                </div>
                
                <h2 style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "#0f172a",
                  margin: "0 0 4px 0",
                }}>
                  {user?.name}
                </h2>
                
                <p style={{
                  fontSize: "0.9rem",
                  color: "#64748b",
                  margin: "0 0 12px 0",
                }}>
                  {user?.email}
                </p>

                {user?.role === 'admin' && (
                  <span style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    background: "#fee2e2",
                    color: "#b91c1c",
                    borderRadius: "30px",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                  }}>
                    ADMIN
                  </span>
                )}

                <p style={{
                  fontSize: "0.9rem",
                  color: "#475569",
                  margin: "16px 0 0 0",
                  padding: "16px 0 0",
                  borderTop: "1px solid #f1f5f9",
                }}>
                  Member since {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>

              {/* Stats */}
              <div style={{
                padding: "20px 24px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                background: "#f8fafc",
              }}>
                <div style={{
                  textAlign: "center",
                }}>
                  <div style={{
                    fontSize: "1.8rem",
                    fontWeight: "700",
                    color: "#3b82f6",
                    marginBottom: "4px",
                  }}>
                    {userReports.length}
                  </div>
                  <div style={{
                    fontSize: "0.8rem",
                    color: "#64748b",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}>
                    Reports
                  </div>
                </div>
                
                <div style={{
                  textAlign: "center",
                }}>
                  <div style={{
                    fontSize: "1.8rem",
                    fontWeight: "700",
                    color: "#10b981",
                    marginBottom: "4px",
                  }}>
                    {userReports.filter(r => r.status === 'resolved').length}
                  </div>
                  <div style={{
                    fontSize: "0.8rem",
                    color: "#64748b",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}>
                    Resolved
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div style={{
                padding: "16px",
              }}>
                <button
                  onClick={() => setActiveTab('overview')}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    width: "100%",
                    padding: "12px 16px",
                    border: "none",
                    background: activeTab === 'overview' ? "#f8fafc" : "transparent",
                    borderRadius: "12px",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    color: activeTab === 'overview' ? "#3b82f6" : "#475569",
                    cursor: "pointer",
                    textAlign: "left",
                    marginBottom: "4px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== 'overview') {
                      e.currentTarget.style.background = "#f8fafc";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== 'overview') {
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  <span style={{ fontSize: "1.2rem" }}>📊</span>
                  <span>Overview</span>
                </button>

                <button
                  onClick={() => setActiveTab('reports')}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    width: "100%",
                    padding: "12px 16px",
                    border: "none",
                    background: activeTab === 'reports' ? "#f8fafc" : "transparent",
                    borderRadius: "12px",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    color: activeTab === 'reports' ? "#3b82f6" : "#475569",
                    cursor: "pointer",
                    textAlign: "left",
                    marginBottom: "4px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== 'reports') {
                      e.currentTarget.style.background = "#f8fafc";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== 'reports') {
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  <span style={{ fontSize: "1.2rem" }}>📋</span>
                  <span>My Reports</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    width: "100%",
                    padding: "12px 16px",
                    border: "none",
                    background: activeTab === 'settings' ? "#f8fafc" : "transparent",
                    borderRadius: "12px",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    color: activeTab === 'settings' ? "#3b82f6" : "#475569",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== 'settings') {
                      e.currentTarget.style.background = "#f8fafc";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== 'settings') {
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  <span style={{ fontSize: "1.2rem" }}>⚙️</span>
                  <span>Settings</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div style={{
            background: "white",
            borderRadius: "24px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
            border: "1px solid #f1f5f9",
            padding: "32px",
            minHeight: "500px",
          }}>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h2 style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "#0f172a",
                  margin: "0 0 24px 0",
                }}>
                  Welcome back, {user?.name?.split(' ')[0]}!
                </h2>

                {/* Activity Summary */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "16px",
                  marginBottom: "32px",
                }}>
                  <div style={{
                    padding: "24px",
                    background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
                    borderRadius: "20px",
                  }}>
                    <div style={{
                      fontSize: "2rem",
                      marginBottom: "12px",
                    }}>📊</div>
                    <h3 style={{
                      fontSize: "1.8rem",
                      fontWeight: "700",
                      color: "#1e40af",
                      margin: "0 0 4px 0",
                    }}>
                      {userReports.length}
                    </h3>
                    <p style={{
                      fontSize: "0.9rem",
                      color: "#1e40af",
                      margin: 0,
                      opacity: 0.8,
                    }}>
                      Total Reports
                    </p>
                  </div>

                  <div style={{
                    padding: "24px",
                    background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
                    borderRadius: "20px",
                  }}>
                    <div style={{
                      fontSize: "2rem",
                      marginBottom: "12px",
                    }}>⏳</div>
                    <h3 style={{
                      fontSize: "1.8rem",
                      fontWeight: "700",
                      color: "#92400e",
                      margin: "0 0 4px 0",
                    }}>
                      {userReports.filter(r => r.status !== 'resolved').length}
                    </h3>
                    <p style={{
                      fontSize: "0.9rem",
                      color: "#92400e",
                      margin: 0,
                      opacity: 0.8,
                    }}>
                      In Progress
                    </p>
                  </div>

                  <div style={{
                    padding: "24px",
                    background: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
                    borderRadius: "20px",
                  }}>
                    <div style={{
                      fontSize: "2rem",
                      marginBottom: "12px",
                    }}>✅</div>
                    <h3 style={{
                      fontSize: "1.8rem",
                      fontWeight: "700",
                      color: "#065f46",
                      margin: "0 0 4px 0",
                    }}>
                      {userReports.filter(r => r.status === 'resolved').length}
                    </h3>
                    <p style={{
                      fontSize: "0.9rem",
                      color: "#065f46",
                      margin: 0,
                      opacity: 0.8,
                    }}>
                      Resolved
                    </p>
                  </div>
                </div>

                {/* Recent Reports */}
                <div>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}>
                    <h3 style={{
                      fontSize: "1.2rem",
                      fontWeight: "600",
                      color: "#0f172a",
                      margin: 0,
                    }}>
                      Recent Reports
                    </h3>
                    <button
                      onClick={() => setActiveTab('reports')}
                      style={{
                        padding: "8px 16px",
                        border: "1px solid #e2e8f0",
                        background: "white",
                        borderRadius: "30px",
                        fontSize: "0.9rem",
                        color: "#475569",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#f8fafc";
                        e.currentTarget.style.borderColor = "#cbd5e1";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "white";
                        e.currentTarget.style.borderColor = "#e2e8f0";
                      }}
                    >
                      View All →
                    </button>
                  </div>

                  {userReports.slice(0, 3).map((report) => (
                    <div
                      key={report.id}
                      style={{
                        display: "flex",
                        gap: "16px",
                        padding: "16px",
                        borderBottom: "1px solid #f1f5f9",
                      }}
                    >
                      <img
                        src={report.image}
                        alt={report.title}
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "12px",
                          objectFit: "cover",
                        }}
                      />
                      <div style={{
                        flex: 1,
                      }}>
                        <div style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: "8px",
                        }}>
                          <h4 style={{
                            fontSize: "1rem",
                            fontWeight: "600",
                            color: "#0f172a",
                            margin: 0,
                          }}>
                            {report.title}
                          </h4>
                          <span style={{
                            padding: "4px 8px",
                            borderRadius: "30px",
                            fontSize: "0.7rem",
                            fontWeight: "600",
                            ...getStatusColor(report.status),
                          }}>
                            {report.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </div>
                        <p style={{
                          fontSize: "0.9rem",
                          color: "#475569",
                          margin: "0 0 8px 0",
                        }}>
                          {report.category}
                        </p>
                        <div style={{
                          display: "flex",
                          gap: "16px",
                          fontSize: "0.8rem",
                          color: "#64748b",
                        }}>
                          <span>📅 {new Date(report.date).toLocaleDateString()}</span>
                          <span>👍 {report.votes}</span>
                          <span>💬 {report.comments}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reports Tab */}
            {activeTab === 'reports' && (
              <div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "24px",
                }}>
                  <h2 style={{
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    color: "#0f172a",
                    margin: 0,
                  }}>
                    My Reports
                  </h2>
                  
                  <Link
                    to="/report"
                    style={{
                      padding: "10px 20px",
                      background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                      color: "white",
                      textDecoration: "none",
                      borderRadius: "30px",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      boxShadow: "0 4px 10px rgba(37, 99, 235, 0.2)",
                    }}
                  >
                    <span>+</span>
                    <span>New Report</span>
                  </Link>
                </div>

                {/* Filters */}
                <div style={{
                  display: "flex",
                  gap: "8px",
                  marginBottom: "24px",
                  flexWrap: "wrap",
                }}>
                  {['All', 'Pending', 'In Progress', 'Resolved'].map((filter) => (
                    <button
                      key={filter}
                      style={{
                        padding: "6px 16px",
                        border: "none",
                        background: filter === 'All' ? "#3b82f6" : "#f1f5f9",
                        color: filter === 'All' ? "white" : "#475569",
                        borderRadius: "30px",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                {isLoading ? (
                  <div style={{
                    textAlign: "center",
                    padding: "60px 20px",
                  }}>
                    <div style={{
                      width: "40px",
                      height: "40px",
                      margin: "0 auto 16px",
                      border: "3px solid #f1f5f9",
                      borderTopColor: "#3b82f6",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }} />
                    <p style={{
                      color: "#64748b",
                      fontSize: "0.9rem",
                    }}>
                      Loading your reports...
                    </p>
                  </div>
                ) : (
                  <div>
                    {userReports.map((report) => (
                      <div
                        key={report.id}
                        style={{
                          display: "flex",
                          gap: "20px",
                          padding: "20px",
                          background: "#f8fafc",
                          borderRadius: "16px",
                          marginBottom: "12px",
                          cursor: "pointer",
                          transition: "transform 0.2s ease, box-shadow 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <img
                          src={report.image}
                          alt={report.title}
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "12px",
                            objectFit: "cover",
                          }}
                        />
                        
                        <div style={{
                          flex: 1,
                        }}>
                          <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginBottom: "8px",
                          }}>
                            <div>
                              <h3 style={{
                                fontSize: "1.1rem",
                                fontWeight: "600",
                                color: "#0f172a",
                                margin: "0 0 4px 0",
                              }}>
                                {report.title}
                              </h3>
                              <span style={{
                                fontSize: "0.8rem",
                                color: "#64748b",
                              }}>
                                {report.category}
                              </span>
                            </div>
                            <span style={{
                              padding: "4px 12px",
                              borderRadius: "30px",
                              fontSize: "0.8rem",
                              fontWeight: "600",
                              ...getStatusColor(report.status),
                            }}>
                              {report.status.replace('-', ' ').toUpperCase()}
                            </span>
                          </div>
                          
                          <p style={{
                            fontSize: "0.9rem",
                            color: "#475569",
                            margin: "0 0 12px 0",
                          }}>
                            {report.description}
                          </p>
                          
                          <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}>
                            <div style={{
                              display: "flex",
                              gap: "16px",
                              fontSize: "0.9rem",
                              color: "#64748b",
                            }}>
                              <span>📅 {new Date(report.date).toLocaleDateString()}</span>
                              <span>👍 {report.votes}</span>
                              <span>💬 {report.comments}</span>
                            </div>
                            
                            <button style={{
                              padding: "6px 12px",
                              border: "1px solid #e2e8f0",
                              background: "white",
                              borderRadius: "20px",
                              fontSize: "0.8rem",
                              color: "#475569",
                              cursor: "pointer",
                            }}>
                              View Details →
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <h2 style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "#0f172a",
                  margin: "0 0 24px 0",
                }}>
                  Account Settings
                </h2>

                {isEditing ? (
                  <form onSubmit={handleSubmit}>
                    <div style={{
                      marginBottom: "24px",
                    }}>
                      <label style={{
                        display: "block",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        color: "#475569",
                        marginBottom: "6px",
                      }}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          border: "1px solid #e2e8f0",
                          borderRadius: "12px",
                          fontSize: "0.9rem",
                          outline: "none",
                          transition: "border-color 0.2s ease",
                        }}
                        onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                        onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                      />
                    </div>

                    <div style={{
                      marginBottom: "24px",
                    }}>
                      <label style={{
                        display: "block",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        color: "#475569",
                        marginBottom: "6px",
                      }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          border: "1px solid #e2e8f0",
                          borderRadius: "12px",
                          fontSize: "0.9rem",
                          outline: "none",
                          transition: "border-color 0.2s ease",
                        }}
                        onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                        onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                      />
                    </div>

                    <div style={{
                      marginBottom: "24px",
                    }}>
                      <label style={{
                        display: "block",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        color: "#475569",
                        marginBottom: "6px",
                      }}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          border: "1px solid #e2e8f0",
                          borderRadius: "12px",
                          fontSize: "0.9rem",
                          outline: "none",
                          transition: "border-color 0.2s ease",
                        }}
                        onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                        onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                      />
                    </div>

                    <div style={{
                      marginBottom: "32px",
                    }}>
                      <label style={{
                        display: "block",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        color: "#475569",
                        marginBottom: "6px",
                      }}>
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows="4"
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          border: "1px solid #e2e8f0",
                          borderRadius: "12px",
                          fontSize: "0.9rem",
                          outline: "none",
                          resize: "vertical",
                          transition: "border-color 0.2s ease",
                        }}
                        onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                        onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                      />
                    </div>

                    <div style={{
                      marginBottom: "32px",
                    }}>
                      <h3 style={{
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        color: "#0f172a",
                        margin: "0 0 16px 0",
                      }}>
                        Notification Preferences
                      </h3>
                      
                      {['email', 'push', 'sms'].map((type) => (
                        <label
                          key={type}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            marginBottom: "12px",
                            cursor: "pointer",
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={formData.notifications[type]}
                            onChange={() => handleNotificationChange(type)}
                            style={{
                              width: "18px",
                              height: "18px",
                              cursor: "pointer",
                            }}
                          />
                          <span style={{
                            fontSize: "0.9rem",
                            color: "#475569",
                            textTransform: "capitalize",
                          }}>
                            {type} notifications
                          </span>
                        </label>
                      ))}
                    </div>

                    <div style={{
                      display: "flex",
                      gap: "12px",
                    }}>
                      <button
                        type="submit"
                        style={{
                          padding: "12px 24px",
                          background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                          border: "none",
                          borderRadius: "30px",
                          color: "white",
                          fontSize: "0.9rem",
                          fontWeight: "500",
                          cursor: "pointer",
                          boxShadow: "0 4px 10px rgba(37, 99, 235, 0.2)",
                        }}
                      >
                        Save Changes
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        style={{
                          padding: "12px 24px",
                          background: "white",
                          border: "1px solid #e2e8f0",
                          borderRadius: "30px",
                          color: "#475569",
                          fontSize: "0.9rem",
                          fontWeight: "500",
                          cursor: "pointer",
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <div style={{
                      marginBottom: "32px",
                    }}>
                      <h3 style={{
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        color: "#0f172a",
                        margin: "0 0 16px 0",
                      }}>
                        Personal Information
                      </h3>
                      
                      <div style={{
                        background: "#f8fafc",
                        padding: "20px",
                        borderRadius: "16px",
                      }}>
                        <div style={{
                          display: "grid",
                          gridTemplateColumns: "120px 1fr",
                          gap: "12px",
                          marginBottom: "12px",
                        }}>
                          <span style={{
                            fontSize: "0.9rem",
                            color: "#64748b",
                          }}>Name:</span>
                          <span style={{
                            fontSize: "0.9rem",
                            color: "#0f172a",
                            fontWeight: "500",
                          }}>{user?.name}</span>
                        </div>
                        
                        <div style={{
                          display: "grid",
                          gridTemplateColumns: "120px 1fr",
                          gap: "12px",
                          marginBottom: "12px",
                        }}>
                          <span style={{
                            fontSize: "0.9rem",
                            color: "#64748b",
                          }}>Email:</span>
                          <span style={{
                            fontSize: "0.9rem",
                            color: "#0f172a",
                            fontWeight: "500",
                          }}>{user?.email}</span>
                        </div>
                        
                        <div style={{
                          display: "grid",
                          gridTemplateColumns: "120px 1fr",
                          gap: "12px",
                        }}>
                          <span style={{
                            fontSize: "0.9rem",
                            color: "#64748b",
                          }}>Phone:</span>
                          <span style={{
                            fontSize: "0.9rem",
                            color: "#0f172a",
                            fontWeight: "500",
                          }}>{formData.phone || 'Not provided'}</span>
                        </div>
                      </div>
                    </div>

                    <div style={{
                      marginBottom: "32px",
                    }}>
                      <h3 style={{
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        color: "#0f172a",
                        margin: "0 0 16px 0",
                      }}>
                        Bio
                      </h3>
                      
                      <div style={{
                        background: "#f8fafc",
                        padding: "20px",
                        borderRadius: "16px",
                      }}>
                        <p style={{
                          fontSize: "0.9rem",
                          color: "#475569",
                          margin: 0,
                          lineHeight: "1.6",
                        }}>
                          {formData.bio || 'No bio provided yet.'}
                        </p>
                      </div>
                    </div>

                    <div style={{
                      marginBottom: "32px",
                    }}>
                      <h3 style={{
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        color: "#0f172a",
                        margin: "0 0 16px 0",
                      }}>
                        Notification Preferences
                      </h3>
                      
                      <div style={{
                        background: "#f8fafc",
                        padding: "20px",
                        borderRadius: "16px",
                      }}>
                        {Object.entries(formData.notifications).map(([key, value]) => (
                          <div
                            key={key}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "8px 0",
                              borderBottom: "1px solid #e2e8f0",
                            }}
                          >
                            <span style={{
                              fontSize: "0.9rem",
                              color: "#475569",
                              textTransform: "capitalize",
                            }}>
                              {key} notifications
                            </span>
                            <span style={{
                              fontSize: "0.9rem",
                              color: value ? "#10b981" : "#94a3b8",
                              fontWeight: "500",
                            }}>
                              {value ? 'Enabled' : 'Disabled'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setIsEditing(true)}
                      style={{
                        padding: "12px 24px",
                        background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                        border: "none",
                        borderRadius: "30px",
                        color: "white",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        cursor: "pointer",
                        boxShadow: "0 4px 10px rgba(37, 99, 235, 0.2)",
                      }}
                    >
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }

          @media (max-width: 768px) {
            div[style*="grid-template-columns: 320px 1fr"] {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Profile;