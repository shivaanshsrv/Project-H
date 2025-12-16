import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    api.get("/ai/all").then(res => setHistory(res.data.data));
  }, []);

  return (
    <div>
      <h2>Your Analyses</h2>

      {history.map(h => (
        <div key={h._id}>
          <p>Panels: {h.panelCount}</p>
          <p>Energy: {h.estimatedEnergy}</p>

          <img
            src={`http://localhost:5000/${h.rooftopMask}`}
            width="200"
          />

          <button onClick={() => api.delete(`/ai/${h._id}`)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
