import { useState } from "react";
import "./VolunteerDashboard.css";

function VolunteerDashboard() {

  const [openRequests, setOpenRequests] = useState([]);
  const [myRequests, setMyRequests] = useState([]);

  return (
    <div className="volunteer-container">

      <h2>Volunteer Dashboard</h2>

      <div className="stats">
        <div>Open Requests: {openRequests.length}</div>
        <div>My Tasks: {myRequests.length}</div>
      </div>

      <h3>Open Help Requests</h3>
      {openRequests.map((req) => (
        <div key={req.id} className="card">
          <h4>{req.helpType}</h4>
          <p>{req.description}</p>
          <button>Accept</button>
        </div>
      ))}

      <h3>My Assigned Tasks</h3>
      {myRequests.map((req) => (
        <div key={req.id} className="card">
          <h4>{req.helpType}</h4>
          <button>Mark Completed</button>
        </div>
      ))}

    </div>
  );
}

export default VolunteerDashboard;
