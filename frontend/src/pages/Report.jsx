import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
import "./Report.css";

export default function Report() {
  const [desc, setDesc] = useState("");
  const [disasterType, setDisasterType] = useState("");
  const [location, setLocation] = useState("");
  const [disasterSize, setDisasterSize] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const disasterTypes = [
    "Flood",
    "Earthquake",
    "Fire",
    "Wildfire",
    "Landslide",
    "Hurricane",
    "Tornado",
    "Cyclone",
    "Tsunami",
    "Storm",
    "Volcanic Eruption",
    "Drought",
    "Snowstorm",
    "Hailstorm",
    "Building Collapse",
    "Road Accident",
    "Other"
  ];

  const submit = async () => {
    if (!desc.trim()) {
      setError("Please describe the disaster");
      return;
    }
    if (!disasterType) {
      setError("Please select a disaster type");
      return;
    }
    if (!disasterSize) {
      setError("Please select disaster size");
      return;
    }
    if (!location.trim()) {
      setError("Please enter a location");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const reportData = {
            description: desc,
            disasterType: disasterType,
            disasterSize: disasterSize,
            locationName: location,
            coordinates: {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            },
            status: "pending",
            createdAt: serverTimestamp()
          };

          await addDoc(collection(db, "reports"), reportData);

          setMessage("Report sent successfully!");
          setDesc("");
          setDisasterType("");
          setDisasterSize("");
          setLocation("");
          setTimeout(() => setMessage(null), 3000);

        } catch (err) {
          setError("Failed to send report. Please try again.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError("Unable to get location. Please enable location services.");
        setLoading(false);
        console.error(err);
      }
    );
  };

  const reset = () => {
    setDesc("");
    setDisasterType("");
    setDisasterSize("");
    setLocation("");
    setError(null);
    setMessage(null);
  };

  return (
    <div className="report-container">
      <div className="report-card">
        <h1 className="report-title">Report Disaster</h1>
        <p className="report-subtitle">
          Help us respond quickly by reporting disaster incidents in your area
        </p>

        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}

        <form className="report-form" onSubmit={(e) => { e.preventDefault(); submit(); }}>
          <div className="form-group">
            <label className="form-label">Disaster Type *</label>
            <select
              className="report-select"
              value={disasterType}
              onChange={(e) => setDisasterType(e.target.value)}
              disabled={loading}
            >
              <option value="">Select disaster type...</option>
              {disasterTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Disaster Size *</label>
            <select
              className="report-select"
              value={disasterSize}
              onChange={(e) => setDisasterSize(e.target.value)}
              disabled={loading}
            >
              <option value="">Select disaster size...</option>
              {["Small", "Medium", "High"].map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Location *</label>
            <input
              type="text"
              className="report-input"
              placeholder="Enter location name (e.g., Downtown, Main St)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Disaster Description *</label>
            <textarea
              className="report-textarea"
              placeholder="Describe the disaster situation, including affected area and additional details..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="location-info">
            📍 Your precise location will be automatically captured and sent with the report
          </div>

          <div className="button-group">
            <button type="button" className="cancel-btn" onClick={reset} disabled={loading}>
              Clear
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Sending..." : "Send Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
