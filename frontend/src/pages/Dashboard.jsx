import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="main-layout">
      
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">🌐 Disaster Alert</h2>
        <ul>
          <li className="active">Dashboard</li>
          <li>View Map</li>
          <li>Report Disaster</li>
          <li>Request Help</li>
          <li>Settings</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="content">

        {/* Top Bar */}
        <div className="topbar">
          <h1>DISASTER ALERT NETWORK</h1>
          <span className="notification">🔔</span>
        </div>

        {/* Map Section */}
        <div className="map-section">
          <img 
            src="/images/dashboard-preview.png" 
            alt="Disaster Map" 
            className="map-image"
          />
        </div>

        {/* Bottom Cards */}
        <div className="bottom-panels">
          
          <div className="panel">
            <h3>Active Alerts</h3>
            <ul>
              <li>🔥 Hurricane Delta - Category 3</li>
              <li>🌲 Wildfire - California North</li>
              <li>🌊 Flash Flood Warning</li>
            </ul>
          </div>

          <div className="panel">
            <h3>Report Disaster</h3>
            <input type="text" placeholder="Location" />
            <textarea placeholder="Description"></textarea>
            <button className="btn-orange">Submit Report</button>
          </div>

          <div className="panel">
            <h3>Request Help</h3>
            <input type="text" placeholder="Help Needed" />
            <input type="number" placeholder="Number of People" />
            <button className="btn-red">Send Request</button>
          </div>

        </div>

      </div>
    </div>
  );
}
