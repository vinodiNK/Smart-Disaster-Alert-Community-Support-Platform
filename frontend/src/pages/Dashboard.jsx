import { Link } from "react-router-dom";
import AlertMap from "../components/AlertMap";
import "./Dashboard.css";

export default function Dashboard() {
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
          <span className="notification">🔔</span>
        </div>

        {/* 🌍 Live Map Section */}
        <div className="map-section">
          <AlertMap />
        </div>

        {/* Bottom Panels */}
        <div className="bottom-panels">

          <div className="panel">
            <h3>Active Alerts</h3>
            <p>All real-time alerts are shown on the map above.</p>
          </div>

          <div className="panel">
            <h3>Report Disaster</h3>
            <Link to="/report">
              <button className="btn-orange">Go to Report Page</button>
            </Link>
          </div>

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
