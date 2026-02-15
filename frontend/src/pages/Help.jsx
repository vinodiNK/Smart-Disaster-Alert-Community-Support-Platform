import { useState } from "react";
import api from "../services/api";
import "./Help.css";

const helpTypeInfo = {
  medical: { icon: "🏥", label: "Medical Assistance" },
  food: { icon: "🍲", label: "Food & Water" },
  rescue: { icon: "🚨", label: "Rescue/Emergency" }
};

export default function Help() {
  const [type, setType] = useState("medical");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const submit = async () => {
    if (!desc.trim()) {
      setError("Please describe what kind of help you need");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          await api.post("/help", {
            type,
            description: desc,
            location: {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            }
          });
          setMessage("Help request sent successfully!");
          setDesc("");
          setType("medical");
          setTimeout(() => setMessage(null), 3000);
        } catch (err) {
          setError("Failed to send help request. Please try again.");
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
    setType("medical");
    setError(null);
    setMessage(null);
  };

  return (
    <div className="help-container">
      <div className="help-card">
        <h1 className="help-title">Request Help</h1>
        <p className="help-subtitle">
          Let volunteers and organizations know what assistance you need
        </p>

        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}

        <form className="help-form" onSubmit={(e) => { e.preventDefault(); submit(); }}>
          <div className="form-group">
            <label className="form-label">Type of Help Needed</label>
            <select
              className="help-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
              disabled={loading}
            >
              <option value="medical">🏥 Medical Assistance</option>
              <option value="food">🍲 Food & Water</option>
              <option value="rescue">🚨 Rescue/Emergency</option>
            </select>

            <div className="type-indicators">
              {Object.entries(helpTypeInfo).map(([key, info]) => (
                <div key={key} className={`type-badge ${key}`}>
                  <span>{info.icon}</span>
                  <span>{info.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Describe Your Needs</label>
            <textarea
              className="help-textarea"
              placeholder="Please describe what help you need. Include any relevant details about your situation, medical condition, number of people affected, etc..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="location-info">
            📍 Your location will be automatically captured and shared with volunteers
          </div>

          <div className="button-group">
            <button
              type="button"
              className="cancel-btn"
              onClick={reset}
              disabled={loading}
            >
              Clear
            </button>
            <button
              type="submit"
              className="submit-btn"
              onClick={submit}
              disabled={loading}
            >
              {loading ? "Sending..." : "Request Help"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
