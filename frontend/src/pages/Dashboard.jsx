import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlertMap from "../components/AlertMap";
import { db } from "../firebase";
import "./Dashboard.css";

export default function Dashboard() {
  const [alerts, setAlerts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("All");

  // Fetch alerts from Firestore
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

  // Get unique districts
  const districts = ["All", ...new Set(alerts.map(alert => alert.district).filter(Boolean))];

  // Filter alerts based on selected district
  const filteredAlerts = alerts.filter(
    alert => selectedDistrict === "All" || alert.district === selectedDistrict
  );

  return (
    <div className="main-layout">

      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">🌐 Disaster Alert Dashboard</h2>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/map">View Map</Link></li>
          <li><Link to="/report">Report Disaster</Link></li>
          <li><Link to="/help">Request Help</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="content">

        {/* Top Bar */}
        <div className="topbar">
          <h1>DISASTER ALERT NETWORK</h1>
          <span className="notification">🔔 {alerts.length}</span>
        </div>

        {/* Main Area: map (left) + active alerts (right) */}
        <div className="main-area">
          <div className="map-section">
            <AlertMap alerts={filteredAlerts} />
          </div>

          <aside className="right-panel">
            <div className="bottom-panels">

              {/* Active Alerts Panel */}
              <div className="panel">
                <h3>Active Alerts</h3>

                {/* District Filter Dropdown */}
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                >
                  {districts.map((district, idx) => (
                    <option key={idx} value={district}>
                      {district}
                    </option>
                  ))}
                </select>

                {/* Alert List */}
                {filteredAlerts.length === 0 ? (
                  <p>No active alerts for this district.</p>
                ) : (
                  filteredAlerts.map(alert => (
                    <div key={alert.id} className="alert-card">
                      <h4>{alert.title}</h4>
                      <p><strong>District:</strong> {alert.district}</p>
                      
                      <p>{alert.description}</p>
                      <p><strong>Status:</strong> {alert.status}</p>
                    </div>
                  ))
                )}
              </div>

            </div>
          </aside>
        </div>

      </div>
    </div>
  );
}
