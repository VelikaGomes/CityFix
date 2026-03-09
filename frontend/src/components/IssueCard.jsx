function IssueCard({ issue }) {
  const getStatusColor = (status) => {
    const colors = {
      "Pending": { bg: "#fff7e6", text: "#b45b0f", border: "#ffd9a3" },
      "In Progress": { bg: "#e6f3ff", text: "#0066cc", border: "#b8d9ff" },
      "Resolved": { bg: "#e6ffe6", text: "#1f7b1f", border: "#b8e6b8" },
    };
    return colors[status] || { bg: "#f0f0f0", text: "#333", border: "#ccc" };
  };

  const statusStyle = getStatusColor(issue.status);

  return (
    <div
      style={{
        border: "none",
        padding: "24px",
        margin: "16px",
        borderRadius: "16px",
        background: "#ffffff",
        boxShadow: "0 10px 30px -5px rgba(0,0,0,0.08), 0 5px 15px -5px rgba(0,0,0,0.06)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 20px 40px -10px rgba(0,0,0,0.15), 0 8px 20px -8px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 10px 30px -5px rgba(0,0,0,0.08), 0 5px 15px -5px rgba(0,0,0,0.06)";
      }}
    >
      {/* Decorative accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "4px",
          background: `linear-gradient(90deg, ${statusStyle.text}40, ${statusStyle.text})`,
        }}
      />

      {/* Header section with title and status */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "16px",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "1.35rem",
            fontWeight: "600",
            color: "#1a1f2e",
            letterSpacing: "-0.02em",
            lineHeight: "1.4",
            flex: 1,
            paddingRight: "16px",
          }}
        >
          {issue.title}
        </h3>

        {/* Status badge */}
        <span
          style={{
            padding: "6px 14px",
            borderRadius: "40px",
            fontSize: "0.8rem",
            fontWeight: "600",
            background: statusStyle.bg,
            color: statusStyle.text,
            border: `1px solid ${statusStyle.border}`,
            whiteSpace: "nowrap",
            textTransform: "uppercase",
            letterSpacing: "0.02em",
          }}
        >
          {issue.status}
        </span>
      </div>

      {/* Description */}
      <p
        style={{
          margin: "0 0 20px 0",
          fontSize: "0.95rem",
          lineHeight: "1.6",
          color: "#4a5568",
        }}
      >
        {issue.description}
      </p>

      {/* Location with icon */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "12px 0 0 0",
          borderTop: "1px solid #edf2f7",
          color: "#718096",
          fontSize: "0.9rem",
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: 0.6 }}
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span style={{ fontWeight: "500" }}>{issue.location}</span>
      </div>

      {/* Subtle hover effect overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: "16px",
          pointerEvents: "none",
          transition: "box-shadow 0.3s ease",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1)",
        }}
      />
    </div>
  );
}

export default IssueCard;