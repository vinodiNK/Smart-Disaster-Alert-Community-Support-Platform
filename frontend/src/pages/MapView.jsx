import { useEffect, useState } from "react";
import MapComponent from "../components/MapComponent";
import api from "../services/api";

export default function MapView() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    api.get("/alerts").then(res => setAlerts(res.data));
  }, []);

  return <MapComponent alerts={alerts} />;
}
