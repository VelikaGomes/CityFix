import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";
import { useIssues } from "../context/IssueContext";

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom marker icons based on status
const getMarkerIcon = (status) => {
  const colors = {
    "Pending": "#f59e0b",
    "In Progress": "#3b82f6",
    "Resolved": "#10b981"
  };
  
  const color = colors[status] || "#f59e0b";
  
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        background: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        border: 3px solid white;
        position: relative;
      ">
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
          color: white;
          font-size: 14px;
          font-weight: 600;
        ">●</div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

// Helper function to generate random coordinates around a center point
const generateCoordinates = (index, center) => {
  // This generates a random offset within ~0.5km of the center
  const latOffset = (Math.random() - 0.5) * 0.01;
  const lngOffset = (Math.random() - 0.5) * 0.01;
  return [center[0] + latOffset, center[1] + lngOffset];
};

function MapView({ center = [15.4909, 73.8278], zoom = 13 }) {
  const { issues } = useIssues();
  const [activeIssue, setActiveIssue] = useState(null);

  // If there are no issues from context, use empty array
  // The sample issues are removed - we'll show nothing if no issues exist
  const displayIssues = issues.map((issue, index) => ({
    ...issue,
    coordinates: generateCoordinates(index, center)
  }));

  // Calculate stats
  const stats = {
    total: displayIssues.length,
    pending: displayIssues.filter(i => i.status === "Pending").length,
    inProgress: displayIssues.filter(i => i.status === "In Progress").length,
    resolved: displayIssues.filter(i => i.status === "Resolved").length,
  };

  return (
    <div style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "40px 24px",
      fontFamily: "system-ui, -apple-system, sans-serif",
    }}>
      <h1 style={{
        fontSize: "2rem",
        fontWeight: "600",
        color: "#0f172a",
        margin: "0 0 8px 0",
      }}>Issue Map</h1>
      <p style={{
        fontSize: "1rem",
        color: "#64748b",
        margin: "0 0 32px 0",
      }}>View all reported issues on the map</p>

      <div style={{
        width: "100%",
        height: "500px",
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: "0 12px 40px -12px rgba(0,0,0,0.25)",
        border: "1px solid #f1f5f9",
        position: "relative",
      }}>
        {/* Map Legend */}
        <div style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          zIndex: 1000,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(8px)",
          padding: "12px 16px",
          borderRadius: "40px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          border: "1px solid rgba(255,255,255,0.5)",
          display: "flex",
          gap: "20px",
          fontSize: "13px",
          fontWeight: "500",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "#f59e0b", fontSize: "18px" }}>●</span>
            <span>Pending ({stats.pending})</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "#3b82f6", fontSize: "18px" }}>●</span>
            <span>In Progress ({stats.inProgress})</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "#10b981", fontSize: "18px" }}>●</span>
            <span>Resolved ({stats.resolved})</span>
          </div>
        </div>

        {/* Map Container */}
        <MapContainer
          center={center}
          zoom={zoom}
          style={{
            width: "100%",
            height: "100%",
            background: "#f8fafc",
          }}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          
          {displayIssues.length > 0 ? (
            displayIssues.map(issue => (
              <Marker
                key={issue.id}
                position={issue.coordinates}
                icon={getMarkerIcon(issue.status)}
                eventHandlers={{
                  click: () => setActiveIssue(issue),
                  mouseover: (e) => {
                    e.target.openPopup();
                  },
                  mouseout: (e) => {
                    e.target.closePopup();
                  }
                }}
              >
                <Popup>
                  <div style={{
                    padding: "12px",
                    minWidth: "200px",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                    }}>
                      <h4 style={{
                        margin: 0,
                        fontSize: "15px",
                        fontWeight: "600",
                        color: "#0f172a",
                      }}>
                        {issue.title}
                      </h4>
                      <span style={{
                        fontSize: "11px",
                        padding: "2px 8px",
                        borderRadius: "30px",
                        background: 
                          issue.status === "Pending" ? "#fef3c7" :
                          issue.status === "In Progress" ? "#dbeafe" : "#d1fae5",
                        color: 
                          issue.status === "Pending" ? "#92400e" :
                          issue.status === "In Progress" ? "#1e40af" : "#065f46",
                        fontWeight: "500",
                      }}>
                        {issue.status}
                      </span>
                    </div>
                    
                    <p style={{
                      margin: "0 0 8px 0",
                      fontSize: "13px",
                      color: "#475569",
                      lineHeight: "1.5",
                    }}>
                      {issue.description}
                    </p>
                    
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "12px",
                      color: "#64748b",
                      borderTop: "1px dashed #e2e8f0",
                      paddingTop: "8px",
                      marginTop: "4px",
                    }}>
                      <span>📍</span>
                      <span>{issue.location}</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))
          ) : (
            // Center marker when no issues
            <Marker position={center}>
              <Popup>
                <div style={{ padding: "8px" }}>
                  <p style={{ margin: 0 }}>No issues reported yet</p>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>

        {/* Stats Bar */}
        <div style={{
          position: "absolute",
          bottom: "16px",
          left: "16px",
          zIndex: 1000,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(8px)",
          padding: "12px 20px",
          borderRadius: "40px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          border: "1px solid rgba(255,255,255,0.5)",
          display: "flex",
          gap: "24px",
          fontSize: "14px",
          fontWeight: "500",
        }}>
          <div>
            <span style={{ color: "#64748b", marginRight: "8px" }}>Total</span>
            <span style={{ color: "#0f172a", fontWeight: "600" }}>{stats.total}</span>
          </div>
          <div>
            <span style={{ color: "#f59e0b", marginRight: "8px" }}>●</span>
            <span>{stats.pending}</span>
          </div>
          <div>
            <span style={{ color: "#3b82f6", marginRight: "8px" }}>●</span>
            <span>{stats.inProgress}</span>
          </div>
          <div>
            <span style={{ color: "#10b981", marginRight: "8px" }}>●</span>
            <span>{stats.resolved}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapView;