function IssueCard({ issue }) {
  const getStatusStyle = (status) => {
    const styles = {
      "Pending": {
        dot: "#f59e0b",
        bg: "#fef3c7",
        text: "#92400e",
        label: "Pending"
      },
      "In Progress": {
        dot: "#3b82f6",
        bg: "#dbeafe",
        text: "#1e40af",
        label: "In Progress"
      },
      "Resolved": {
        dot: "#10b981",
        bg: "#d1fae5",
        text: "#065f46",
        label: "Resolved"
      }
    };
    return styles[status] || styles["Pending"];
  };

  const status = getStatusStyle(issue.status);

  return (
    <div
      style={{
        background: "white",
        borderRadius: "20px",
        padding: "20px",
        margin: "12px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
        border: "1px solid #f1f5f9",
        transition: "all 0.2s ease",
        cursor: "pointer",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.02)";
        e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)";
        e.currentTarget.style.borderColor = "#e2e8f0";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)";
        e.currentTarget.style.borderColor = "#f1f5f9";
      }}
    >
      {/* Header with status indicator */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "16px"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flex: 1
        }}>
          <div style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: status.dot,
          }} />
          <h3 style={{
            margin: 0,
            fontSize: "1.1rem",
            fontWeight: "600",
            color: "#0f172a",
            lineHeight: "1.4",
          }}>
            {issue.title}
          </h3>
        </div>
        
        {/* Status badge - minimal */}
        <span style={{
          fontSize: "0.75rem",
          fontWeight: "500",
          color: status.text,
          background: status.bg,
          padding: "4px 10px",
          borderRadius: "30px",
          letterSpacing: "0.3px",
        }}>
          {status.label}
        </span>
      </div>

      {/* Description - clean and readable */}
      <p style={{
        margin: "0 0 16px 0",
        fontSize: "0.9rem",
        lineHeight: "1.5",
        color: "#475569",
      }}>
        {issue.description}
      </p>

      {/* Location - simple and clear */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        paddingTop: "12px",
        borderTop: "1px dashed #e2e8f0",
        fontSize: "0.85rem",
        color: "#64748b",
      }}>
        <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>📍</span>
        <span style={{ fontWeight: "450" }}>{issue.location}</span>
      </div>
    </div>
  );
}

export default IssueCard;