import "./AdminDashboard.css";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h2 className="dashboard-title">🌍 Admin Dashboard</h2>

      <div className="dashboard-layout">
        {/* LEFT SIDE - MAP */}
        <div className="left-section">
          <div className="map-card">
            <h3>Live Disaster Map</h3>
            <div className="map-container">
              <iframe
                title="live-map"
                src="https://maps.google.com/maps?q=Sri%20Lanka&t=&z=7&ie=UTF8&iwloc=&output=embed"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="right-section">
          {/* Stats */}
          <div className="stats-container">
            <div className="stat-card">
              <h4>🚨 Active Alerts</h4>
              <p className="blue">5</p>
            </div>

            <div className="stat-card">
              <h4>📍 Reports Pending</h4>
              <p className="green">12</p>
            </div>

            <div className="stat-card">
              <h4>👥 Volunteers</h4>
              <p className="red">250</p>
            </div>
          </div>

          {/* Recent Reports */}
          <div className="card">
            <h3>Recent Reports</h3>
            <ul>
              <li>
                🔴 Flood in Kandy <span>6:00 AM</span>
              </li>
              <li>
                🔴 Fire in Galle <span>10:00 AM</span>
              </li>
              <li>
                🔴 Landslide in Ella <span>10:00 AM</span>
              </li>
            </ul>
          </div>

          {/* Volunteer Activity */}
          <div className="card">
            <h3>Volunteer Activity</h3>
            <ul>
              <li>
                🟢 John D - Deployed to Galle <span>10:00 AM</span>
              </li>
              <li>
                🟢 Sara K - Assisting in Kandy <span>10:00 AM</span>
              </li>
              <li>
                🟢 Amir S - Available in Ella <span>10:00 AM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
