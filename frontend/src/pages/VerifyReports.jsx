import { useState } from "react";
import "./VerifyReports.css";

export default function VerifyReports() {
  const [reports] = useState([
    {
      id: 1,
      type: "Flood",
      location: "Kandy",
      description: "Severe flooding in downtown area",
      size: "High",
      time: "6:00 AM",
      status: "pending"
    },
    {
      id: 2,
      type: "Fire",
      location: "Galle",
      description: "Building fire reported near market",
      size: "Medium",
      time: "10:00 AM",
      status: "pending"
    },
    {
      id: 3,
      type: "Landslide",
      location: "Ella",
      description: "Landslide blocking main road",
      size: "High",
      time: "10:00 AM",
      status: "pending"
    },
    {
      id: 4,
      type: "Storm",
      location: "Colombo",
      description: "Heavy storm with strong winds",
      size: "Medium",
      time: "2:30 PM",
      status: "pending"
    }
  ]);

  const [filter, setFilter] = useState("all");

  const handleApprove = (id) => {
    alert(`Report ${id} approved!`);
  };

  const handleReject = (id) => {
    alert(`Report ${id} rejected!`);
  };

  const filteredReports = filter === "all" ? reports : reports.filter(r => r.status === filter);

  return (
    <div className="verify-reports-container">
      <div className="verify-reports-header">
        <h1>📋 Verify Reports</h1>
        <p>Review and approve/reject disaster reports</p>
      </div>

      <div className="filter-section">
        <button 
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All Reports ({reports.length})
        </button>
        <button 
          className={`filter-btn ${filter === "pending" ? "active" : ""}`}
          onClick={() => setFilter("pending")}
        >
          Pending ({reports.filter(r => r.status === "pending").length})
        </button>
      </div>

      <div className="reports-grid">
        {filteredReports.map(report => (
          <div key={report.id} className="report-item">
            <div className="report-header">
              <h3>{report.type}</h3>
              <span className={`size-badge ${report.size.toLowerCase()}`}>
                {report.size}
              </span>
            </div>

            <div className="report-details">
              <p><strong>📍 Location:</strong> {report.location}</p>
              <p><strong>📝 Description:</strong> {report.description}</p>
              <p><strong>🕐 Reported at:</strong> {report.time}</p>
            </div>

            <div className="report-actions">
              <button 
                className="approve-btn"
                onClick={() => handleApprove(report.id)}
              >
                ✓ Approve
              </button>
              <button 
                className="reject-btn"
                onClick={() => handleReject(report.id)}
              >
                ✕ Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <div className="empty-state">
          <p>No reports to verify</p>
        </div>
      )}
    </div>
  );
}
