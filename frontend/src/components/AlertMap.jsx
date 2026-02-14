import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "../utils/fixLeafletIcons";

export default function AlertMap({ alerts }) {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={[7.8731, 80.7718]}
        zoom={7}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {alerts
          .filter(
            (alert) =>
              alert.latitude &&
              alert.longitude &&
              !isNaN(alert.latitude) &&
              !isNaN(alert.longitude)
          )
          .map((alert) => (
            <Marker
              key={alert.id}
              position={[alert.latitude, alert.longitude]}
            >
              <Popup>
                <div>
                  <h3>{alert.title}</h3>
                   <p><strong>Location:</strong> {alert.locationName}</p>
                  <p>{alert.description}</p>
                  <p>
                    <strong>Status:</strong> {alert.status}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
