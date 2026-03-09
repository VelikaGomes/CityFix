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

  const getStatusColor = (status) => {
    const colors = {
      "Pending": { bg: "#fff7e6", text: "#b45b0f", border: "#ffd9a3", light: "#fff1d6" },
      "In Progress": { bg: "#e6f3ff", text: "#0066cc", border: "#b8d9ff", light: "#d9ebff" },
      "Resolved": { bg: "#e6ffe6", text: "#1f7b1f", border: "#b8e6b8", light: "#ccffcc" },
    };
    return colors[status] || { bg: "#f0f0f0", text: "#333", border: "#ccc", light: "#f5f5f5" };
  };

  const getPriorityColor = (priority) => {
    const colors = {
      "High": { bg: "#fee9e7", text: "#b91c1c" },
      "Medium": { bg: "#fff4e5", text: "#b45309" },
      "Low": { bg: "#e6f7e6", text: "#0d7c3f" },
    };
    return colors[priority] || { bg: "#f0f0f0", text: "#333" };
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
      <div className="issue-details-loading">
        <div className="loading-spinner"></div>
        <p>Loading issue details...</p>
      </div>
    );
  }

  if (error || !issue) {
    return (
      <div className="issue-details-error">
        <div className="error-icon">⚠️</div>
        <h2>Oops! Something went wrong</h2>
        <p>{error || "Issue not found"}</p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }

  const statusStyle = getStatusColor(issue.status);
  const priorityStyle = getPriorityColor(issue.priority);

  return (
    <div className="issue-details-container">
      {/* Navigation */}
      <div className="details-nav">
        <button onClick={() => navigate(-1)} className="back-button">
          <span className="back-icon">←</span>
          Back
        </button>
        <div className="nav-actions">
          <button className="share-button">
            <span>↗️</span> Share
          </button>
          <button className="report-button">
            <span>🚩</span> Report
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="details-grid">
        {/* Left Column - Main Info */}
        <div className="details-main">
          {/* Header */}
          <div className="details-header">
            <h1 className="details-title">{issue.title}</h1>
            <div className="header-badges">
              <span 
                className="status-badge-large"
                style={{ background: statusStyle.bg, color: statusStyle.text }}
              >
                {issue.status}
              </span>
              <span 
                className="priority-badge-large"
                style={{ background: priorityStyle.bg, color: priorityStyle.text }}
              >
                {issue.priority} Priority
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="details-section">
            <h3>Description</h3>
            <p className="description-text">{issue.description}</p>
          </div>

          {/* Location Details */}
          <div className="details-section">
            <h3>Location</h3>
            <div className="location-card">
              <div className="location-icon">📍</div>
              <div className="location-info">
                <p className="location-address">{issue.location}</p>
                <button className="view-map-link">View on Map →</button>
              </div>
            </div>
          </div>

          {/* Updates Timeline */}
          {issue.updates && issue.updates.length > 0 && (
            <div className="details-section">
              <h3>Updates</h3>
              <div className="timeline">
                {issue.updates.map((update, index) => (
                  <div key={index} className="timeline-item">
                    <div 
                      className="timeline-dot"
                      style={{ background: getStatusColor(update.status).text }}
                    />
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <span 
                          className="timeline-status"
                          style={{ color: getStatusColor(update.status).text }}
                        >
                          {update.status}
                        </span>
                        <span className="timeline-date">{update.date}</span>
                      </div>
                      <p className="timeline-comment">{update.comment}</p>
                      <span className="timeline-user">by {update.updatedBy}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments Section */}
          {issue.comments && issue.comments.length > 0 && (
            <div className="details-section">
              <h3>Comments ({issue.comments.length})</h3>
              <div className="comments-container">
                <div className="comments-list">
                  {issue.comments.map(comment => (
                    <div key={comment.id} className="comment-item">
                      <div className="comment-avatar">{comment.avatar || "👤"}</div>
                      <div className="comment-content">
                        <div className="comment-header">
                          <span className="comment-user">{comment.user}</span>
                          <span className="comment-date">{comment.date}</span>
                        </div>
                        <p className="comment-text">{comment.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="details-sidebar">
          {/* Status Card */}
          <div className="sidebar-card status-card">
            <h4>Issue Status</h4>
            <div className="status-display">
              <div 
                className="status-indicator"
                style={{ background: statusStyle.light }}
              >
                <span 
                  className="status-dot"
                  style={{ background: statusStyle.text }}
                />
                <span style={{ color: statusStyle.text }}>{issue.status}</span>
              </div>
            </div>

            {/* Admin Actions */}
            <div className="admin-actions">
              <button 
                className="update-status-btn"
                onClick={() => setShowStatusModal(true)}
              >
                Update Status
              </button>
            </div>
          </div>

          {/* Details Card */}
          <div className="sidebar-card">
            <h4>Details</h4>
            <div className="details-list">
              <div className="detail-item">
                <span className="detail-label">Reported by</span>
                <span className="detail-value">{issue.reportedBy}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Date reported</span>
                <span className="detail-value">
                  {new Date(issue.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Category</span>
                <span className="detail-value">{issue.category}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Issue ID</span>
                <span className="detail-value">#{issue.id}</span>
              </div>
            </div>
          </div>

          {/* Community Card */}
          <div className="sidebar-card">
            <h4>Community</h4>
            <div className="community-stats">
              <div className="stat-item">
                <span className="stat-icon">👍</span>
                <div>
                  <span className="stat-number">{issue.votes || 0}</span>
                  <span className="stat-label">votes</span>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">💬</span>
                <div>
                  <span className="stat-number">{issue.comments?.length || 0}</span>
                  <span className="stat-label">comments</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && (
        <div className="modal-overlay" onClick={() => setShowStatusModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Update Issue Status</h3>
              <button className="close-btn" onClick={() => setShowStatusModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <select 
                className="status-select-modal"
                value={newStatus || issue.status}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
              <textarea 
                placeholder="Add a comment about this update..." 
                className="update-comment"
                value={updateComment}
                onChange={(e) => setUpdateComment(e.target.value)}
                rows="4"
              />
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setShowStatusModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleStatusUpdate}>
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IssueDetails;