import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <h1>Disaster Alert Dashboard</h1>
      <Link to="/map">View Map</Link><br/>
      <Link to="/report">Report Disaster</Link><br/>
      <Link to="/help">Request Help</Link>
    </div>
  );
}
