import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/status")
      .then(res => setMessage(res.data))
      .catch(err => setMessage("Error connecting to server"));
  }, []);

  return (
    <div style={{ padding: "30px", fontSize: "24px" }}>
      {message}
    </div>
  );
}

export default App;
