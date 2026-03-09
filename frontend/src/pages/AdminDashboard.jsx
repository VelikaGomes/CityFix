import { useState } from "react";

function AdminDashboard() {
  const [issues, setIssues] = useState([
    {
      id: 1,
      title: "Broken Street Light",
      description: "The street light at Main St and 5th Ave has been flickering for days",
      status: "Pending",
      location: "Main St & 5th Ave",
      reportedBy: "John D.",
      date: "2024-01-15",
      priority: "High",
    },
    {
      id: 2,
      title: "Pothole on Residential Road",
      description: "Large pothole forming on Oak Street near the community park",
      status: "In Progress",
      location: "123 Oak Street",
      reportedBy: "Sarah M.",
      date: "2024-01-14",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Graffiti on Public Building",
      description: "Fresh graffiti on the community center wall",
      status: "Resolved",
      location: "456 Maple Avenue",
      reportedBy: "Mike R.",
      date: "2024-01-13",
      priority: "Low",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIssue, setSelectedIssue] = useState(null);

  const statusColors = {
    "Pending": { bg: "#fff7e6", text: "#b45b0f", border: "#ffd9a3" },
    "In Progress": { bg: "#e6f3ff", text: "#0066cc", border: "#b8d9ff" },
    "Resolved": { bg: "#e6ffe6", text: "#1f7b1f", border: "#b8e6b8" },
  };

  const priorityColors = {
    "High": { bg: "#fee9e7", text: "#b91c1c" },
    "Medium": { bg: "#fff4e5", text: "#b45309" },
    "Low": { bg: "#e6f7e6", text: "#0d7c3f" },
  };

  const stats = {
    total: issues.length,
    pending: issues.filter(i => i.status === "Pending").length,
    inProgress: issues.filter(i => i.status === "In Progress").length,
    resolved: issues.filter(i => i.status === "Resolved").length,
  };

  const filteredIssues = issues.filter(issue => {
    const matchesFilter = filterStatus === "All" || issue.status === filterStatus;
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const updateStatus = (issueId, newStatus) => {
    setIssues(issues.map(issue => 
      issue.id === issueId ? { ...issue, status: newStatus } : issue
    ));
    setSelectedIssue(null);
  };

  return (
    <div className="admin-dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <p className="dashboard-subtitle">
            Manage and track all community-reported issues
          </p>
        </div>
        <button className="export-btn">
          <span>📊</span>
          Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3>Total Issues</h3>
            <p className="stat-number">{stats.total}</p>
          </div>
        </div>
        <div className="stat-card pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>Pending</h3>
            <p className="stat-number">{stats.pending}</p>
          </div>
        </div>
        <div className="stat-card progress">
          <div className="stat-icon">🔄</div>
          <div className="stat-content">
            <h3>In Progress</h3>
            <p className="stat-number">{stats.inProgress}</p>
          </div>
        </div>
        <div className="stat-card resolved">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>Resolved</h3>
            <p className="stat-number">{stats.resolved}</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="filters-section">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search issues by title, location, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-tabs">
          {["All", "Pending", "In Progress", "Resolved"].map(status => (
            <button
              key={status}
              className={`filter-tab ${filterStatus === status ? "active" : ""}`}
              onClick={() => setFilterStatus(status)}
            >
              {status === "All" ? "📋 All" : status}
            </button>
          ))}
        </div>
      </div>

      {/* Issues Table */}
      <div className="issues-table-container">
        <table className="issues-table">
          <thead>
            <tr>
              <th>Issue</th>
              <th>Location</th>
              <th>Reported By</th>
              <th>Date</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredIssues.map(issue => (
              <tr key={issue.id}>
                <td className="issue-cell">
                  <div className="issue-info">
                    <strong>{issue.title}</strong>
                    <small>{issue.description.substring(0, 60)}...</small>
                  </div>
                </td>
                <td>
                  <span className="location-badge">
                    📍 {issue.location}
                  </span>
                </td>
                <td>{issue.reportedBy}</td>
                <td>{new Date(issue.date).toLocaleDateString()}</td>
                <td>
                  <span 
                    className="priority-badge"
                    style={{
                      background: priorityColors[issue.priority].bg,
                      color: priorityColors[issue.priority].text,
                    }}
                  >
                    {issue.priority}
                  </span>
                </td>
                <td>
                  <select
                    className="status-select"
                    value={issue.status}
                    onChange={(e) => updateStatus(issue.id, e.target.value)}
                    style={{
                      background: statusColors[issue.status].bg,
                      color: statusColors[issue.status].text,
                      borderColor: statusColors[issue.status].border,
                    }}
                  >
                    <option value="Pending">⏳ Pending</option>
                    <option value="In Progress">🔄 In Progress</option>
                    <option value="Resolved">✅ Resolved</option>
                  </select>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="action-btn view"
                      onClick={() => setSelectedIssue(issue)}
                      title="View Details"
                    >
                      👁️
                    </button>
                    <button 
                      className="action-btn edit"
                      title="Edit Issue"
                    >
                      ✏️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredIssues.length === 0 && (
          <div className="no-results">
            <span className="no-results-icon">🔍</span>
            <h3>No issues found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Issue Details Modal */}
      {selectedIssue && (
        <div className="modal-overlay" onClick={() => setSelectedIssue(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Issue Details</h2>
              <button className="close-btn" onClick={() => setSelectedIssue(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <label>Title</label>
                <p>{selectedIssue.title}</p>
              </div>
              <div className="detail-row">
                <label>Description</label>
                <p>{selectedIssue.description}</p>
              </div>
              <div className="detail-row">
                <label>Location</label>
                <p>📍 {selectedIssue.location}</p>
              </div>
              <div className="detail-grid">
                <div className="detail-item">
                  <label>Reported By</label>
                  <p>{selectedIssue.reportedBy}</p>
                </div>
                <div className="detail-item">
                  <label>Date</label>
                  <p>{new Date(selectedIssue.date).toLocaleDateString()}</p>
                </div>
                <div className="detail-item">
                  <label>Priority</label>
                  <p>
                    <span 
                      className="priority-badge"
                      style={{
                        background: priorityColors[selectedIssue.priority].bg,
                        color: priorityColors[selectedIssue.priority].text,
                      }}
                    >
                      {selectedIssue.priority}
                    </span>
                  </p>
                </div>
                <div className="detail-item">
                  <label>Current Status</label>
                  <p>
                    <span 
                      className="status-badge"
                      style={{
                        background: statusColors[selectedIssue.status].bg,
                        color: statusColors[selectedIssue.status].text,
                      }}
                    >
                      {selectedIssue.status}
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