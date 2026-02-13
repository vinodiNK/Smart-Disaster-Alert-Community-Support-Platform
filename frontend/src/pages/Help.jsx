import { useState } from "react";
import api from "../services/api";

export default function Help() {
  const [type, setType] = useState("medical");
  const [desc, setDesc] = useState("");

  const submit = async () => {
    navigator.geolocation.getCurrentPosition(async pos => {
      await api.post("/help", {
        type,
        description: desc,
        location: {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }
      });
      alert("Help request sent");
    });
  };

  return (
    <div>
      <h2>Request Help</h2>
      <select onChange={e=>setType(e.target.value)}>
        <option value="medical">Medical</option>
        <option value="food">Food</option>
        <option value="rescue">Rescue</option>
      </select>
      <textarea onChange={e=>setDesc(e.target.value)} />
      <button onClick={submit}>Request</button>
    </div>
  );
}
