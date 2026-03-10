import { useState } from "react";
import { useIssues } from '../context/IssueContext';

function AdminDashboard() {
  const { issues, updateIssue, refreshIssues } = useIssues();
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIssue, setSelectedIssue] = useState(null);

  const statusColors = {
    "Pending": { bg: "#fef3c7", text: "#92400e", border: "#f59e0b" },
    "In Progress": { bg: "#dbeafe", text: "#1e40af", border: "#3b82f6" },
    "Resolved": { bg: "#d1fae5", text: "#065f46", border: "#10b981" },
  };

  const priorityColors = {
    "High": { bg: "#fee2e2", text: "#b91c1c", dot: "#ef4444" },
    "Medium": { bg: "#fff3cd", text: "#856404", dot: "#f59e0b" },
    "Low": { bg: "#e6f7e6", text: "#0d7c3f", dot: "#10b981" },
  };

  const stats = {
    total: issues.length,
    pending: issues.filter(i => i.status === "Pending").length,
    inProgress: issues.filter(i => i.status === "In Progress").length,
    resolved: issues.filter(i => i.status === "Resolved").length,
  };

  const filteredIssues = issues.filter(issue => {
    const matchesFilter = filterStatus === "All" || issue.status === filterStatus;
    const matchesSearch = searchTerm === '' || 
      issue.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleStatusUpdate = async (issueId, newStatus) => {
    const result = await updateIssue(issueId, { status: newStatus });
    if (result.success) {
      // Optionally show success message
      console.log('Status updated successfully');
    }
  };

  // Sort issues by date (newest first)
  const sortedIssues = [...filteredIssues].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  return (
    <div style={{
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "32px 24px",
      fontFamily: "system-ui, -apple-system, sans-serif",
      background: "#f8fafc",
      minHeight: "100vh",
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "32px",
      }}>
        <div>
          <h1 style={{
            fontSize: "2rem",
            fontWeight: "600",
            color: "#0f172a",
            margin: "0 0 8px 0",
          }}>
            Admin Dashboard
          </h1>
          <p style={{
            fontSize: "1rem",
            color: "#64748b",
            margin: 0,
          }}>
            Manage and track all community-reported issues
          </p>
        </div>
        <button 
          onClick={refreshIssues}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            background: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "40px",
            fontSize: "0.9rem",
            fontWeight: "500",
            color: "#0f172a",
            cursor: "pointer",
          }}
        >
          <span>🔄</span>
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "16px",
        marginBottom: "32px",
      }}>
        {[
          { label: "Total Issues", value: stats.total, icon: "📋", color: "#3b82f6" },
          { label: "Pending", value: stats.pending, icon: "⏳", color: "#f59e0b" },
          { label: "In Progress", value: stats.inProgress, icon: "🔄", color: "#3b82f6" },
          { label: "Resolved", value: stats.resolved, icon: "✅", color: "#10b981" },
        ].map((stat, index) => (
          <div
            key={index}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "20px",
              border: "1px solid #f1f5f9",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div style={{
              width: "48px",
              height: "48px",
              background: `${stat.color}10`,
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
                fontSize: "0.9rem",
                color: "#64748b",
                margin: "0 0 4px 0",
              }}>{stat.label}</p>
              <p style={{
                fontSize: "2rem",
                fontWeight: "600",
                color: "#0f172a",
                margin: 0,
                lineHeight: 1,
              }}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "20px",
        border: "1px solid #f1f5f9",
        marginBottom: "24px",
      }}>
        <div style={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
          flexWrap: "wrap",
        }}>
          <div style={{
            flex: 1,
            minWidth: "300px",
            position: "relative",
          }}>
            <span style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "1.1rem",
              color: "#94a3b8",
            }}>🔍</span>
            <input
              type="text"
              placeholder="Search issues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 16px 14px 48px",
                border: "1px solid #e2e8f0",
                borderRadius: "40px",
                fontSize: "0.95rem",
                outline: "none",
              }}
            />
          </div>

          <div style={{
            display: "flex",
            gap: "8px",
            background: "#f8fafc",
            padding: "4px",
            borderRadius: "40px",
          }}>
            {["All", "Pending", "In Progress", "Resolved"].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "40px",
                  border: "none",
                  background: filterStatus === status ? "white" : "transparent",
                  color: filterStatus === status ? "#0f172a" : "#64748b",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  boxShadow: filterStatus === status ? "0 2px 8px rgba(0,0,0,0.04)" : "none",
                }}
              >
                {status === "All" ? "📋 All" : status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Issues Table */}
      <div style={{
        background: "white",
        borderRadius: "24px",
        border: "1px solid #f1f5f9",
        overflow: "hidden",
      }}>
        <div style={{
          overflowX: "auto",
        }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
          }}>
            <thead>
              <tr style={{
                background: "#f8fafc",
                borderBottom: "1px solid #e2e8f0",
              }}>
                {["Issue", "Location", "Reported", "Priority", "Status", "Actions"].map(header => (
                  <th key={header} style={{
                    textAlign: "left",
                    padding: "16px 20px",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    color: "#64748b",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedIssues.length > 0 ? (
                sortedIssues.map(issue => (
                  <tr key={issue.id} style={{
                    borderBottom: "1px solid #f1f5f9",
                  }}>
                    <td style={{ padding: "16px 20px" }}>
                      <div>
                        <div style={{
                          fontWeight: "600",
                          color: "#0f172a",
                          marginBottom: "4px",
                        }}>{issue.title}</div>
                        <div style={{
                          fontSize: "0.85rem",
                          color: "#64748b",
                        }}>{issue.description?.substring(0, 50)}...</div>
                      </div>
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <span style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "0.9rem",
                        color: "#475569",
                      }}>
                        📍 {issue.location}
                      </span>
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <div>
                        <div style={{ fontWeight: "500", color: "#0f172a" }}>{issue.reportedBy || 'Anonymous'}</div>
                        <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                          {new Date(issue.date).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 12px",
                        borderRadius: "30px",
                        fontSize: "0.85rem",
                        fontWeight: "500",
                        background: priorityColors[issue.priority || 'Medium']?.bg || '#f1f5f9',
                        color: priorityColors[issue.priority || 'Medium']?.text || '#64748b',
                      }}>
                        <span style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: priorityColors[issue.priority || 'Medium']?.dot || '#94a3b8',
                        }} />
                        {issue.priority || 'Medium'}
                      </span>
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <select
                        value={issue.status}
                        onChange={(e) => handleStatusUpdate(issue.id, e.target.value)}
                        style={{
                          padding: "8px 16px",
                          borderRadius: "30px",
                          border: "1px solid",
                          fontSize: "0.85rem",
                          fontWeight: "500",
                          cursor: "pointer",
                          outline: "none",
                          background: statusColors[issue.status]?.bg || '#f1f5f9',
                          color: statusColors[issue.status]?.text || '#64748b',
                          borderColor: statusColors[issue.status]?.border || '#e2e8f0',
                        }}
                      >
                        <option value="Pending">⏳ Pending</option>
                        <option value="In Progress">🔄 In Progress</option>
                        <option value="Resolved">✅ Resolved</option>
                      </select>
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <button
                        onClick={() => setSelectedIssue(issue)}
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "10px",
                          border: "1px solid #e2e8f0",
                          background: "white",
                          fontSize: "1.1rem",
                          cursor: "pointer",
                        }}
                      >
                        👁️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{
                    padding: "60px 20px",
                    textAlign: "center",
                  }}>
                    <span style={{
                      fontSize: "3rem",
                      display: "block",
                      marginBottom: "16px",
                      opacity: 0.5,
                    }}>📋</span>
                    <h3 style={{
                      margin: "0 0 8px 0",
                      color: "#0f172a",
                      fontSize: "1.2rem",
                    }}>No issues found</h3>
                    <p style={{
                      margin: 0,
                      color: "#64748b",
                    }}>Issues reported by users will appear here</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Issue Details Modal */}
      {selectedIssue && (
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
        }} onClick={() => setSelectedIssue(null)}>
          <div style={{
            background: "white",
            borderRadius: "24px",
            width: "90%",
            maxWidth: "600px",
            maxHeight: "80vh",
            overflow: "auto",
          }} onClick={e => e.stopPropagation()}>
            <div style={{
              padding: "24px",
              borderBottom: "1px solid #f1f5f9",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <h2 style={{
                margin: 0,
                fontSize: "1.3rem",
                color: "#0f172a",
              }}>Issue Details</h2>
              <button
                onClick={() => setSelectedIssue(null)}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  border: "none",
                  background: "#f1f5f9",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>
            <div style={{ padding: "24px" }}>
              <div style={{ marginBottom: "20px" }}>
                <label style={{
                  fontSize: "0.85rem",
                  color: "#64748b",
                  display: "block",
                  marginBottom: "4px",
                }}>Title</label>
                <p style={{
                  margin: 0,
                  fontSize: "1.1rem",
                  fontWeight: "500",
                  color: "#0f172a",
                }}>{selectedIssue.title}</p>
              </div>
              
              <div style={{ marginBottom: "20px" }}>
                <label style={{
                  fontSize: "0.85rem",
                  color: "#64748b",
                  display: "block",
                  marginBottom: "4px",
                }}>Description</label>
                <p style={{
                  margin: 0,
                  color: "#475569",
                  lineHeight: "1.6",
                }}>{selectedIssue.description}</p>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "20px",
              }}>
                <div>
                  <label style={{
                    fontSize: "0.85rem",
                    color: "#64748b",
                    display: "block",
                    marginBottom: "4px",
                  }}>Location</label>
                  <p style={{
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    color: "#475569",
                  }}>📍 {selectedIssue.location}</p>
                </div>
                <div>
                  <label style={{
                    fontSize: "0.85rem",
                    color: "#64748b",
                    display: "block",
                    marginBottom: "4px",
                  }}>Reported By</label>
                  <p style={{
                    margin: 0,
                    color: "#475569",
                  }}>{selectedIssue.reportedBy || 'Anonymous'}</p>
                </div>
                <div>
                  <label style={{
                    fontSize: "0.85rem",
                    color: "#64748b",
                    display: "block",
                    marginBottom: "4px",
                  }}>Date</label>
                  <p style={{
                    margin: 0,
                    color: "#475569",
                  }}>{new Date(selectedIssue.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <label style={{
                    fontSize: "0.85rem",
                    color: "#64748b",
                    display: "block",
                    marginBottom: "4px",
                  }}>Priority</label>
                  <p style={{ margin: 0 }}>
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "4px 12px",
                      borderRadius: "30px",
                      fontSize: "0.85rem",
                      fontWeight: "500",
                      background: priorityColors[selectedIssue.priority || 'Medium']?.bg,
                      color: priorityColors[selectedIssue.priority || 'Medium']?.text,
                    }}>
                      {selectedIssue.priority || 'Medium'}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;