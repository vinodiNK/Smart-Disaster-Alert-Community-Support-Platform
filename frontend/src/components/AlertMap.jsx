import { collection, onSnapshot } from "firebase/firestore";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { db } from "../firebase";
import "../utils/fixLeafletIcons";

export default function AlertMap() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "alerts"),
      (snapshot) => {
        const alertData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAlerts(alertData);
      },
      (error) => {
        console.error("Error fetching alerts:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={[7.8731, 80.7718]}   // Default center (Sri Lanka example)
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
