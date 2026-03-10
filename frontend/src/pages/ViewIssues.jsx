import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIssues } from '../context/IssueContext';

function ViewIssues() {
  const { issues, loading } = useIssues();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const getStatusColor = (status) => {
    const colors = {
      "Pending": { bg: "#fef3c7", text: "#92400e", border: "#f59e0b" },
      "In Progress": { bg: "#dbeafe", text: "#1e40af", border: "#3b82f6" },
      "Resolved": { bg: "#d1fae5", text: "#065f46", border: "#10b981" },
    };
    return colors[status] || colors["Pending"];
  };

  // Filter and sort issues
  const filteredIssues = issues
    .filter(issue => {
      const matchesSearch = searchTerm === '' || 
        issue.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.location?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || issue.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'oldest') {
        return new Date(a.date) - new Date(b.date);
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

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
          <p style={{ color: "#64748b" }}>Loading issues...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "40px 24px",
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
            All Issues <span style={{
              fontSize: "1rem",
              color: "#64748b",
              fontWeight: "normal",
              marginLeft: "8px",
            }}>({filteredIssues.length} of {issues.length})</span>
          </h1>
          <p style={{
            fontSize: "1rem",
            color: "#64748b",
            margin: 0,
          }}>
            Browse and track all community-reported issues
          </p>
        </div>
        
        <Link to="/" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 20px",
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "40px",
          fontSize: "0.95rem",
          color: "#475569",
          textDecoration: "none",
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
          <span style={{ fontSize: "1.2rem" }}>←</span>
          Back to Home
        </Link>
      </div>

      {/* Filters Bar */}
      <div style={{
        background: "white",
        borderRadius: "20px",
        padding: "20px",
        marginBottom: "32px",
        border: "1px solid #f1f5f9",
        display: "flex",
        gap: "16px",
        flexWrap: "wrap",
        alignItems: "center",
      }}>
        {/* Search */}
        <div style={{
          flex: 2,
          minWidth: "250px",
          position: "relative",
        }}>
          <span style={{
            position: "absolute",
            left: "14px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#94a3b8",
            fontSize: "1.1rem",
          }}>🔍</span>
          <input
            type="text"
            placeholder="Search by title, description, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px 12px 44px",
              border: "1px solid #e2e8f0",
              borderRadius: "40px",
              fontSize: "0.95rem",
              outline: "none",
              transition: "all 0.2s ease",
            }}
            onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
            onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
          />
        </div>

        {/* Status Filter */}
        <div style={{
          flex: 1,
          minWidth: "180px",
        }}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              border: "1px solid #e2e8f0",
              borderRadius: "40px",
              fontSize: "0.95rem",
              outline: "none",
              background: "white",
              cursor: "pointer",
            }}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        {/* Sort By */}
        <div style={{
          flex: 1,
          minWidth: "150px",
        }}>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              border: "1px solid #e2e8f0",
              borderRadius: "40px",
              fontSize: "0.95rem",
              outline: "none",
              background: "white",
              cursor: "pointer",
            }}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div style={{
        marginBottom: "20px",
        fontSize: "0.95rem",
        color: "#64748b",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}>
        <span>📋</span>
        <span>Showing {filteredIssues.length} of {issues.length} issues</span>
      </div>

      {/* Issues Grid */}
      {filteredIssues.length === 0 ? (
        <div style={{
          background: "white",
          borderRadius: "24px",
          padding: "60px 20px",
          textAlign: "center",
          border: "1px solid #f1f5f9",
        }}>
          <span style={{
            fontSize: "4rem",
            display: "block",
            marginBottom: "20px",
            opacity: 0.5,
          }}>🔍</span>
          <h3 style={{
            fontSize: "1.3rem",
            color: "#0f172a",
            margin: "0 0 8px 0",
          }}>No issues found</h3>
          <p style={{
            color: "#64748b",
            margin: "0 0 24px 0",
          }}>Try adjusting your search or filter criteria</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('All');
              setSortBy('newest');
            }}
            style={{
              padding: "10px 20px",
              background: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "30px",
              fontSize: "0.95rem",
              cursor: "pointer",
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "20px",
        }}>
          {filteredIssues.map(issue => {
            const statusStyle = getStatusColor(issue.status);
            
            return (
              <Link
                key={issue.id}
                to={`/issue/${issue.id}`}
                style={{ textDecoration: "none" }}
              >
                <div style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "20px",
                  border: "1px solid #f1f5f9",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 30px -10px rgba(0,0,0,0.1)";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "#f1f5f9";
                }}>
                  {/* Header */}
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "12px",
                  }}>
                    <h3 style={{
                      fontSize: "1.1rem",
                      fontWeight: "600",
                      color: "#0f172a",
                      margin: 0,
                      lineHeight: "1.4",
                    }}>{issue.title}</h3>
                    <span style={{
                      fontSize: "0.7rem",
                      color: "#94a3b8",
                      background: "#f1f5f9",
                      padding: "2px 6px",
                      borderRadius: "30px",
                    }}>#{issue.id}</span>
                  </div>

                  {/* Status Badge */}
                  <div style={{
                    marginBottom: "12px",
                  }}>
                    <span style={{
                      padding: "4px 10px",
                      borderRadius: "30px",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      background: statusStyle.bg,
                      color: statusStyle.text,
                      border: `1px solid ${statusStyle.border}`,
                    }}>
                      {issue.status}
                    </span>
                  </div>

                  {/* Description Preview */}
                  <p style={{
                    fontSize: "0.9rem",
                    color: "#475569",
                    margin: "0 0 16px 0",
                    lineHeight: "1.5",
                    flex: 1,
                  }}>
                    {issue.description && issue.description.length > 100
                      ? `${issue.description.substring(0, 100)}...`
                      : issue.description || 'No description provided'}
                  </p>

                  {/* Location */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "0.85rem",
                    color: "#64748b",
                    marginBottom: "8px",
                  }}>
                    <span>📍</span>
                    <span>{issue.location}</span>
                  </div>

                  {/* Footer */}
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "0.8rem",
                    color: "#94a3b8",
                    borderTop: "1px dashed #e2e8f0",
                    paddingTop: "12px",
                    marginTop: "auto",
                  }}>
                    <span>👤 {issue.reportedBy || 'Anonymous'}</span>
                    <span>📅 {issue.date ? new Date(issue.date).toLocaleDateString() : 'Date not available'}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Animations */}
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

export default ViewIssues;