import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
import "./Report.css";

export default function Report() {
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const submit = async () => {
    if (!desc.trim()) {
      setError("Please describe the disaster");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          await addDoc(collection(db, "reports"), {
            description: desc,
            location: {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            },
            status: "pending",
            createdAt: serverTimestamp()
          });

          setMessage("Report sent successfully!");
          setDesc("");
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
            <label className="form-label">Disaster Description</label>
            <textarea
              className="report-textarea"
              placeholder="Describe the disaster situation, including type (flood, earthquake, fire, etc.), affected area, and severity..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="location-info">
            📍 Your location will be automatically captured and sent with the report
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
