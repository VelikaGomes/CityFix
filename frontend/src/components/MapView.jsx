import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function MapView({ issues = [] }) {
  // Sample issues if none provided
  const displayIssues = issues.length > 0 ? issues : [
    {
      id: 1,
      title: "Broken Street Light",
      description: "Street light not working",
      status: "Pending",
      location: "Main St",
    }
  ];

  return (
    <div className="map-container">
      <div className="map-wrapper">
        <MapContainer
          center={[15.4909, 73.8278]}
          zoom={13}
          className="leaflet-container"
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          
          {displayIssues.map(issue => (
            <Marker key={issue.id} position={[15.4909, 73.8278]}>
              <Popup>
                <div style={{ padding: "8px" }}>
                  <h4 style={{ margin: "0 0 8px 0" }}>{issue.title}</h4>
                  <p style={{ margin: "0 0 8px 0", fontSize: "14px" }}>{issue.description}</p>
                  <p style={{ margin: 0, fontSize: "12px", color: "#666" }}>{issue.location}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapView;