import { useState } from "react";
import api from "../services/api";

export default function Report() {
  const [desc, setDesc] = useState("");

  const submit = async () => {
    navigator.geolocation.getCurrentPosition(async pos => {
      await api.post("/reports", {
        description: desc,
        location: {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }
      });
      alert("Report sent");
    });
  };

  return (
    <div>
      <h2>Report Disaster</h2>
      <textarea onChange={e=>setDesc(e.target.value)} />
      <button onClick={submit}>Send Report</button>
    </div>
  );
}
