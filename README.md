
<h1>⚡ Project‑H — Solar Rooftop Analysis</h1>
<span class="badge">Version 1.0 Release</span>
<p>A complete AI-based solar analysis system that processes a rooftop image and predicts solar panel capacity, energy generation, and returns an overlay output visually marking optimal panel regions.</p>

<div class="section">
<h2>📌 Key Features</h2>
<ul>
  <li>Login Authentication System</li>
  <li>Upload Roof Image for Analysis</li>
  <li>Solar Panel Count & System kW Estimation</li>
  <li>Monthly + Yearly Energy Generation Prediction</li>
  <li>Overlay Visualization on Roof Image</li>
  <li>History Page — stores past processed results</li>
  <li>Profile Screen UI Included (Editable coming V2)</li>
  <li>Image Storage: Inputs + Outputs Managed</li>
</ul>
</div>

<div class="section">
<h2>🧩 Tech Stack</h2>
<b>Frontend:</b> Next.js, React, TypeScript, Axios<br>
<b>Backend:</b> FastAPI (Python), Auth, DB Models<br>
<b>AI Service:</b> Image Processing + Overlay Generation<br>
<b>Database:</b> MongoDB<br><br>
Modular structure ensures scalability for analytics, reports & improvements in future upgrades.
</div>

<div class="section">
<h2>📂 Project Structure</h2>
<pre>
Project-H/
 ├─ web/
 │   ├─ frontend/              → UI (Next.js)
 │   │   ├─ app/(auth)/login
 │   │   ├─ app/(app)/analyse
 │   │   ├─ app/(app)/dashboard
 │   │   ├─ app/(app)/history
 │   │   ├─ app/(app)/profile
 │   │   ├─ components/Navbar.tsx
 │   │   └─ frontend-requirements.txt
 │   ├─ backend/               → FastAPI
 │   │   ├─ app/main.py
 │   │   ├─ uploads/          → Input Images
 │   │   └─ requirements.txt
 │   └─ ai_service/            → Output Overlays
 │       ├─ outputs/
 │       └─ processing scripts
</pre>
</div>

<div class="section">
<h2>⚙ Installation & Setup</h2>

<h3>Frontend Setup</h3>
<pre>
cd web/frontend
npm install
npm run dev
</pre>

<h3>Backend Setup</h3>
<pre>
cd web/backend
pip install -r requirements.txt
uvicorn app.main:app --reload
</pre>

<h3>AI Service</h3>
<pre>
cd web/ai_service
uvicorn app.main:app --host 0.0.0.0 --port 5001
</pre>
</div>

<div class="section">
<h2>🧪 Usage Flow</h2>
<ol>
  <li>User Logs In</li>
  <li>Uploads Roof Image → AI Processes It</li>
  <li>Results Display:
      <ul>
        <li>Panel Count</li>
        <li>kW Capacity</li>
        <li>Monthly/Yearly Energy Output</li>
        <li>Overlay Visualization</li>
      </ul>
  </li>
  <li>Analysis Saved → Appears in History Page</li>
  <li>Images accessible from backend mapped folder</li>
</ol>
</div>

<div class="section">
<h2>🚀 Future Enhancements (Planned for V2)</h2>
<ul>
  <li>Side‑By‑Side Input/Output View in History</li>
  <li>User Profile Editing + Photo Upload</li>
  <li>Detailed Solar Efficiency Reports + PDF Export</li>
  <li>Advanced Panel Detection Model Upgrade</li>
  <li>Dashboard Analytics Charts</li>
</ul>
</div>

<div style="margin-top:40px;">
<h2>👨‍💻 Developers</h2>

<table style="width:100%;border-collapse:collapse;margin-top:15px;">
<tr>
<td style="padding:18px;border-left:6px solid #0e4fff;background:#ffffff;border-radius:6px;box-shadow:0 4px 14px rgba(0,0,0,0.06);">
<b style="font-size:18px;color:#0e4fff;">Kushagra</b><br>
<span style="color:#333;">Frontend Developer</span>
<p style="margin-top:8px;line-height:1.6;color:#444;">
• Complete UI/UX & Next.js workflow<br>
• Routing, Auth Pages, Navbar, Dashboard<br>
• Analyse & History Screens Integration<br>
• Design + User Experience Flow
</p>
</td>
</tr>

<tr><td style="height:12px;"></td></tr>

<tr>
<td style="padding:18px;border-left:6px solid #18c964;background:#ffffff;border-radius:6px;box-shadow:0 4px 14px rgba(0,0,0,0.06);">
<b style="font-size:18px;color:#18c964;">Shivansh</b><br>
<span style="color:#333;">Backend & AI Developer</span>
<p style="margin-top:8px;line-height:1.6;color:#444;">
• FastAPI Backend + Database Design<br>
• Authentication, API, Storage Handling<br>
• AI Image Processing & Overlay Model<br>
• Deployment & Architecture Logic
</p>
</td>
</tr>
</table>

<p style="text-align:center;margin-top:35px;color:#777;">
🚀 Built with passion — Project‑H © 2025
</p>
</div>


<div class="footer">
© Project‑H | Solar Optimization through AI — 2025
</div>

</body>
</html>
