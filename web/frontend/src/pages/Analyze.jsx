import { useState } from "react";
import api from "../api/axios";

export default function Analyze() {
  const [file, setFile] = useState(null);

  const upload = async () => {
    const form = new FormData();
    form.append("image", file);

    const res = await api.post("/ai/analyze", form);
    console.log(res.data);
    alert("Analysis complete!");
  };

  return (
    <div>
      <h2>Upload Image for Analysis</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
      <button onClick={upload}>Analyze</button>
    </div>
  );
}
