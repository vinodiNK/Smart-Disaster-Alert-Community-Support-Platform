import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function MapComponent({ alerts }) {
  return (
    <MapContainer center={[7.8731, 80.7718]} zoom={7} style={{ height: "100vh" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {alerts.map((a, i) => (
        <Marker key={i} position={[a.location.lat, a.location.lng]}>
          <Popup>
            <strong>{a.title}</strong><br/>
            {a.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
