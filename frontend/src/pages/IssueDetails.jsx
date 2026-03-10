import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getIssueById, updateIssueStatus } from "../services/api";

function IssueDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [updateComment, setUpdateComment] = useState("");

  useEffect(() => {
    const fetchIssueDetails = async () => {
      try {
        setLoading(true);
        const data = await getIssueById(id);
        if (data) {
          setIssue(data);
        } else {
          setError("Issue not found");
        }
      } catch (err) {
        setError("Failed to load issue details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIssueDetails();
  }, [id]);

  const getStatusStyle = (status) => {
    const styles = {
      "Pending": { bg: "#fef3c7", text: "#92400e", border: "#f59e0b", light: "#fffbeb" },
      "In Progress": { bg: "#dbeafe", text: "#1e40af", border: "#3b82f6", light: "#eff6ff" },
      "Resolved": { bg: "#d1fae5", text: "#065f46", border: "#10b981", light: "#ecfdf5" },
    };
    return styles[status] || styles["Pending"];
  };

  const getPriorityStyle = (priority) => {
    const styles = {
      "High": { bg: "#fee2e2", text: "#b91c1c", dot: "#ef4444" },
      "Medium": { bg: "#fff3cd", text: "#856404", dot: "#f59e0b" },
      "Low": { bg: "#e6f7e6", text: "#0d7c3f", dot: "#10b981" },
    };
    return styles[priority] || styles["Medium"];
  };

  const handleStatusUpdate = async () => {
    try {
      await updateIssueStatus(id, newStatus, updateComment);
      setIssue({ ...issue, status: newStatus });
      setShowStatusModal(false);
      setNewStatus("");
      setUpdateComment("");
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8fafc",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "48px",
            height: "48px",
            margin: "0 auto 20px",
            border: "3px solid #e2e8f0",
            borderTopColor: "#3b82f6",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }} />
          <p style={{ color: "#64748b" }}>Loading issue details...</p>
        </div>
      </div>
    );
  }

  if (error || !issue) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8fafc",
      }}>
        <div style={{
          textAlign: "center",
          background: "white",
          padding: "48px",
          borderRadius: "24px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
        }}>
          <span style={{ fontSize: "4rem", display: "block", marginBottom: "20px" }}>⚠️</span>
          <h2 style={{ fontSize: "1.5rem", color: "#0f172a", marginBottom: "8px" }}>
            Oops! Something went wrong
          </h2>
          <p style={{ color: "#64748b", marginBottom: "24px" }}>
            {error || "Issue not found"}
          </p>
          <Link to="/" style={{
            display: "inline-block",
            padding: "12px 24px",
            background: "#3b82f6",
            color: "white",
            textDecoration: "none",
            borderRadius: "30px",
            fontWeight: "500",
          }}>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const statusStyle = getStatusStyle(issue.status);
  const priorityStyle = getPriorityStyle(issue.priority);

  return (
    <div style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "32px 24px",
      fontFamily: "system-ui, -apple-system, sans-serif",
      background: "#f8fafc",
      minHeight: "100vh",
    }}>
      {/* Navigation */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "32px",
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            background: "white",
            border: "1px solid #e2e8f0",
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
          <span style={{ fontSize: "1.2rem" }}>←</span>
          Back
        </button>
        
        <div style={{ display: "flex", gap: "8px" }}>
          <button style={{
            padding: "8px 16px",
            background: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "30px",
            fontSize: "0.9rem",
            color: "#475569",
            cursor: "pointer",
          }}>
            <span style={{ marginRight: "4px" }}>↗️</span> Share
          </button>
          <button style={{
            padding: "8px 16px",
            background: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "30px",
            fontSize: "0.9rem",
            color: "#475569",
            cursor: "pointer",
          }}>
            <span style={{ marginRight: "4px" }}>🚩</span> Report
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "24px",
      }}>
        {/* Left Column - Main Info */}
        <div>
          {/* Header Card */}
          <div style={{
            background: "white",
            borderRadius: "24px",
            padding: "32px",
            marginBottom: "24px",
            border: "1px solid #f1f5f9",
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "20px",
            }}>
              <h1 style={{
                fontSize: "2rem",
                fontWeight: "600",
                color: "#0f172a",
                margin: 0,
                lineHeight: "1.3",
              }}>{issue.title}</h1>
              <div style={{ display: "flex", gap: "8px" }}>
                <span style={{
                  padding: "6px 16px",
                  borderRadius: "30px",
                  fontSize: "0.85rem",
                  fontWeight: "500",
                  background: statusStyle.bg,
                  color: statusStyle.text,
                  border: `1px solid ${statusStyle.border}`,
                }}>
                  {issue.status}
                </span>
                <span style={{
                  padding: "6px 16px",
                  borderRadius: "30px",
                  fontSize: "0.85rem",
                  fontWeight: "500",
                  background: priorityStyle.bg,
                  color: priorityStyle.text,
                }}>
                  {issue.priority} Priority
                </span>
              </div>
            </div>
            
            <p style={{
              fontSize: "1rem",
              lineHeight: "1.7",
              color: "#475569",
              margin: 0,
            }}>{issue.description}</p>
          </div>

          {/* Location Card */}
          <div style={{
            background: "white",
            borderRadius: "24px",
            padding: "24px",
            marginBottom: "24px",
            border: "1px solid #f1f5f9",
          }}>
            <h3 style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              color: "#0f172a",
              margin: "0 0 16px 0",
            }}>Location</h3>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}>
              <span style={{
                fontSize: "1.5rem",
              }}>📍</span>
              <div>
                <p style={{
                  fontSize: "1rem",
                  color: "#0f172a",
                  margin: "0 0 4px 0",
                }}>{issue.location}</p>
                <button style={{
                  background: "none",
                  border: "none",
                  color: "#3b82f6",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  padding: 0,
                }}>
                  View on Map →
                </button>
              </div>
            </div>
          </div>

          {/* Timeline Card */}
          {issue.updates && issue.updates.length > 0 && (
            <div style={{
              background: "white",
              borderRadius: "24px",
              padding: "24px",
              marginBottom: "24px",
              border: "1px solid #f1f5f9",
            }}>
              <h3 style={{
                fontSize: "1.1rem",
                fontWeight: "600",
                color: "#0f172a",
                margin: "0 0 20px 0",
              }}>Updates</h3>
              <div style={{ position: "relative" }}>
                {issue.updates.map((update, index) => (
                  <div key={index} style={{
                    display: "flex",
                    gap: "16px",
                    position: "relative",
                    paddingBottom: index !== issue.updates.length - 1 ? "24px" : 0,
                  }}>
                    {index !== issue.updates.length - 1 && (
                      <div style={{
                        position: "absolute",
                        left: "11px",
                        top: "24px",
                        width: "2px",
                        height: "calc(100% - 20px)",
                        background: "#e2e8f0",
                      }} />
                    )}
                    <div style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: getStatusStyle(update.status).bg,
                      border: `2px solid ${getStatusStyle(update.status).border}`,
                      flexShrink: 0,
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "4px",
                      }}>
                        <span style={{
                          fontWeight: "600",
                          color: getStatusStyle(update.status).text,
                        }}>{update.status}</span>
                        <span style={{
                          fontSize: "0.85rem",
                          color: "#94a3b8",
                        }}>{update.date}</span>
                      </div>
                      <p style={{
                        fontSize: "0.95rem",
                        color: "#475569",
                        margin: "0 0 4px 0",
                      }}>{update.comment}</p>
                      <span style={{
                        fontSize: "0.8rem",
                        color: "#94a3b8",
                      }}>by {update.updatedBy}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments Card */}
          {issue.comments && issue.comments.length > 0 && (
            <div style={{
              background: "white",
              borderRadius: "24px",
              padding: "24px",
              border: "1px solid #f1f5f9",
            }}>
              <h3 style={{
                fontSize: "1.1rem",
                fontWeight: "600",
                color: "#0f172a",
                margin: "0 0 20px 0",
              }}>Comments ({issue.comments.length})</h3>
              <div>
                {issue.comments.map(comment => (
                  <div key={comment.id} style={{
                    display: "flex",
                    gap: "12px",
                    padding: "16px 0",
                    borderBottom: "1px solid #f1f5f9",
                  }}>
                    <div style={{
                      width: "32px",
                      height: "32px",
                      background: "#3b82f6",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "0.9rem",
                      flexShrink: 0,
                    }}>
                      {comment.user[0]}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "4px",
                      }}>
                        <span style={{
                          fontWeight: "600",
                          color: "#0f172a",
                        }}>{comment.user}</span>
                        <span style={{
                          fontSize: "0.8rem",
                          color: "#94a3b8",
                        }}>{comment.date}</span>
                      </div>
                      <p style={{
                        fontSize: "0.95rem",
                        color: "#475569",
                        margin: 0,
                      }}>{comment.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div>
          {/* Status Card */}
          <div style={{
            background: "white",
            borderRadius: "24px",
            padding: "24px",
            marginBottom: "24px",
            border: "1px solid #f1f5f9",
            position: "sticky",
            top: "24px",
          }}>
            <h4 style={{
              fontSize: "0.9rem",
              fontWeight: "600",
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              margin: "0 0 16px 0",
            }}>Issue Status</h4>
            
            <div style={{
              background: statusStyle.light,
              borderRadius: "16px",
              padding: "16px",
              marginBottom: "20px",
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}>
                <span style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: statusStyle.text,
                }} />
                <span style={{
                  fontWeight: "600",
                  color: statusStyle.text,
                }}>{issue.status}</span>
              </div>
            </div>

            <button
              onClick={() => setShowStatusModal(true)}
              style={{
                width: "100%",
                padding: "14px",
                background: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "0.95rem",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#2563eb"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#3b82f6"}
            >
              Update Status
            </button>
          </div>

          {/* Details Card */}
          <div style={{
            background: "white",
            borderRadius: "24px",
            padding: "24px",
            marginBottom: "24px",
            border: "1px solid #f1f5f9",
          }}>
            <h4 style={{
              fontSize: "0.9rem",
              fontWeight: "600",
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              margin: "0 0 16px 0",
            }}>Details</h4>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <span style={{
                  fontSize: "0.85rem",
                  color: "#94a3b8",
                  display: "block",
                  marginBottom: "4px",
                }}>Reported by</span>
                <span style={{
                  fontSize: "1rem",
                  color: "#0f172a",
                  fontWeight: "500",
                }}>{issue.reportedBy}</span>
              </div>
              
              <div>
                <span style={{
                  fontSize: "0.85rem",
                  color: "#94a3b8",
                  display: "block",
                  marginBottom: "4px",
                }}>Date reported</span>
                <span style={{
                  fontSize: "1rem",
                  color: "#0f172a",
                  fontWeight: "500",
                }}>
                  {new Date(issue.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              
              <div>
                <span style={{
                  fontSize: "0.85rem",
                  color: "#94a3b8",
                  display: "block",
                  marginBottom: "4px",
                }}>Category</span>
                <span style={{
                  fontSize: "1rem",
                  color: "#0f172a",
                  fontWeight: "500",
                }}>{issue.category || "General"}</span>
              </div>
              
              <div>
                <span style={{
                  fontSize: "0.85rem",
                  color: "#94a3b8",
                  display: "block",
                  marginBottom: "4px",
                }}>Issue ID</span>
                <span style={{
                  fontSize: "0.9rem",
                  color: "#64748b",
                  background: "#f1f5f9",
                  padding: "4px 8px",
                  borderRadius: "6px",
                }}>#{issue.id}</span>
              </div>
            </div>
          </div>

          {/* Community Card */}
          <div style={{
            background: "white",
            borderRadius: "24px",
            padding: "24px",
            border: "1px solid #f1f5f9",
          }}>
            <h4 style={{
              fontSize: "0.9rem",
              fontWeight: "600",
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              margin: "0 0 16px 0",
            }}>Community</h4>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "16px",
            }}>
              <div style={{
                background: "#f8fafc",
                padding: "16px",
                borderRadius: "16px",
                textAlign: "center",
              }}>
                <span style={{
                  fontSize: "1.5rem",
                  display: "block",
                  marginBottom: "8px",
                }}>👍</span>
                <span style={{
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  color: "#0f172a",
                  display: "block",
                }}>{issue.votes || 0}</span>
                <span style={{
                  fontSize: "0.8rem",
                  color: "#64748b",
                }}>votes</span>
              </div>
              
              <div style={{
                background: "#f8fafc",
                padding: "16px",
                borderRadius: "16px",
                textAlign: "center",
              }}>
                <span style={{
                  fontSize: "1.5rem",
                  display: "block",
                  marginBottom: "8px",
                }}>💬</span>
                <span style={{
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  color: "#0f172a",
                  display: "block",
                }}>{issue.comments?.length || 0}</span>
                <span style={{
                  fontSize: "0.8rem",
                  color: "#64748b",
                }}>comments</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }} onClick={() => setShowStatusModal(false)}>
          <div style={{
            background: "white",
            borderRadius: "24px",
            width: "90%",
            maxWidth: "500px",
          }} onClick={e => e.stopPropagation()}>
            <div style={{
              padding: "24px",
              borderBottom: "1px solid #f1f5f9",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <h3 style={{
                margin: 0,
                fontSize: "1.2rem",
                color: "#0f172a",
              }}>Update Issue Status</h3>
              <button
                onClick={() => setShowStatusModal(false)}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  border: "none",
                  background: "#f1f5f9",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#64748b",
                }}
              >
                ×
              </button>
            </div>
            
            <div style={{ padding: "24px" }}>
              <select
                value={newStatus || issue.status}
                onChange={(e) => setNewStatus(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  fontSize: "0.95rem",
                  marginBottom: "16px",
                  outline: "none",
                }}
              >
                <option value="Pending">⏳ Pending</option>
                <option value="In Progress">🔄 In Progress</option>
                <option value="Resolved">✅ Resolved</option>
              </select>
              
              <textarea
                placeholder="Add a comment about this update..."
                value={updateComment}
                onChange={(e) => setUpdateComment(e.target.value)}
                rows="4"
                style={{
                  width: "100%",
                  padding: "14px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  fontSize: "0.95rem",
                  marginBottom: "24px",
                  outline: "none",
                  resize: "vertical",
                  fontFamily: "inherit",
                }}
              />
              
              <div style={{
                display: "flex",
                gap: "12px",
                justifyContent: "flex-end",
              }}>
                <button
                  onClick={() => setShowStatusModal(false)}
                  style={{
                    padding: "12px 24px",
                    background: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    fontSize: "0.95rem",
                    cursor: "pointer",
                    color: "#475569",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleStatusUpdate}
                  style={{
                    padding: "12px 24px",
                    background: "#3b82f6",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "0.95rem",
                    cursor: "pointer",
                    color: "white",
                    fontWeight: "500",
                  }}
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default IssueDetails;