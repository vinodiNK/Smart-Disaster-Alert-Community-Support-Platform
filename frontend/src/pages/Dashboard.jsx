import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlertMap from "../components/AlertMap";
import { db } from "../firebase";
import "./Dashboard.css";

export default function Dashboard() {
  const [alerts, setAlerts] = useState([]);

  // 🔥 Fetch alerts from Firestore
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
    <div className="main-layout">
      
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">🌐 Disaster Alert Dashboard</h2>

        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>

          <li>
            <Link to="/map">View Map</Link>
          </li>

          <li>
            <Link to="/report">Report Disaster</Link>
          </li>

          <li>
            <Link to="/help">Request Help</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="content">

        {/* Top Bar */}
        <div className="topbar">
          <h1>DISASTER ALERT NETWORK</h1>
          <span className="notification">
            🔔 {alerts.length}
          </span>
        </div>

        {/* 🌍 Live Map Section */}
        <div className="map-section">
          <AlertMap alerts={alerts} />
        </div>

        {/* Bottom Panels */}
        <div className="bottom-panels">

          {/* 🔴 Active Alerts Panel */}
          <div className="panel">
            <h3>Active Alerts</h3>

            {alerts.length === 0 ? (
              <p>No active alerts.</p>
            ) : (
              alerts.map((alert) => (
                <div key={alert.id} className="alert-card">
                  <h4>{alert.title}</h4>
                   <p><strong>Location:</strong> {alert.locationName}</p>
                  <p>{alert.description}</p>
                  <p>
                    <strong>Status:</strong> {alert.status}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* 🟠 Report Disaster */}
          <div className="panel">
            <h3>Report Disaster</h3>
            <Link to="/report">
              <button className="btn-orange">Go to Report Page</button>
            </Link>
          </div>

          {/* 🔴 Request Help */}
          <div className="panel">
            <h3>Request Help</h3>
            <Link to="/help">
              <button className="btn-red">Request Assistance</button>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
