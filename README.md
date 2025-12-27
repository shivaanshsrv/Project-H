<!DOCTYPE html>
<html>
<head>
<title>Project-H | Solar Roof Analysis</title>

<style>
    body{
        font-family: Arial, sans-serif;
        background:#f3f3f3;
        color:#222;
        line-height:1.6;
        padding:40px;
        max-width:900px;
        margin:auto;
    }
    h1,h2,h3{
        color:#0d6efd;
        margin-top:30px;
    }
    code{
        background:#eee;
        padding:3px 6px;
        border-radius:4px;
    }
    pre{
        background:#111;
        color:#0f0;
        padding:15px;
        border-radius:6px;
        overflow-x:auto;
    }
    .box{
        background:#fff;
        padding:20px;
        border-radius:10px;
        box-shadow:0 0 10px rgba(0,0,0,0.1);
        margin-bottom:25px;
    }
    .dev-card{
        background:#fff;
        padding:15px;
        border-left:6px solid #0d6efd;
        border-radius:6px;
        margin-bottom:10px;
    }
</style>
</head>

<body>

<h1>🚀 Project-H | Solar Roof Analysis</h1>
<p><b>Project-H</b> is an AI powered system that estimates rooftop solar feasibility using uploaded roof images. It calculates panel count, system capacity, energy output & provides overlay visualization.</p>

<div class="box">
<h2>📌 Core Features (Version 1.0)</h2>
<ul>
    <li>User Authentication (Login)</li>
    <li>Upload Roof Image & Get Analysis</li>
    <li>Solar Panel Count Estimation</li>
    <li>System Capacity (kW) Calculation</li>
    <li>Energy Prediction (Monthly & Annual)</li>
    <li>Overlay Output Image Display</li>
    <li>History Storage + Display with Images</li>
    <li>Profile UI Page (editable fields planned for V2)</li>
</ul>
</div>

<div class="box">
<h2>🛠 Tech Stack</h2>
<b>Frontend:</b> Next.js, React, TypeScript, Axios<br>
<b>Backend:</b> FastAPI, Python, Uvicorn, MongoDB<br>
<b>AI Service:</b> Python (image analysis using ML/CV), OpenCV/YOLO(Optional)<br>
<b>Database:</b> MongoDB Atlas<br>
</div>


<div class="box">
<h2>📂 Project Folder Structure</h2>
<pre>
Project-H/
 ├─ web/
 │   ├─ frontend/        → Next.js UI
 │   │   ├─ app/
 │   │   │   ├─ (auth)/login
 │   │   │   ├─ (app)/analyse
 │   │   │   ├─ (app)/dashboard
 │   │   │   ├─ (app)/history
 │   │   │   ├─ (app)/profile
 │   │   │   └─ layout.tsx
 │   │   ├─ components/Navbar.tsx
 │   │   ├─ package.json
 │   │   └─ frontend-requirements.txt
 │   ├─ backend/         → FastAPI
 │   │   ├─ app/
 │   │   │   ├─ main.py
 │   │   ├─ uploads/     → input images saved here
 │   │   └─ requirements.txt
 │   ├─ ai_service/
 │   │   ├─ outputs/     → processed overlay images
 │   │   └─ model files
</pre>
</div>

<div class="box">
<h2>🚀 Setup Instructions</h2>

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

<h3>AI Service (if separate)</h3>
<pre>
cd web/ai_service
python main.py
</pre>

</div>

<div class="box">
<h2>🌍 Environment Variables</h2>
Create `.env.local` inside frontend folder:
<pre>
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
NEXT_PUBLIC_AI_URL=http://127.0.0.1:8000
</pre>
Make sure backend exposes images:
<pre>
/uploads → input images  
/outputs → overlay results  
</pre>
</div>

<div class="box">
<h2>🔗 API Endpoints</h2>

<b>Login</b>
<pre>POST /auth/login</pre>

<b>Analyse Roof</b>
<pre>POST /ai/analyze  (multipart-form)</pre>

<b>History</b>
<pre>GET /analysis/my</pre>
</div>


<div class="box">
<h2>📌 Future V2 Features</h2>
<ul>
    <li>Profile update + photo storage</li>
    <li>Side-by-side input-output view in history</li>
    <li>Report PDF Export</li>
    <li>Dashboard statistics & graphs</li>
    <li>Improved solar capacity model</li>
</ul>
</div>


<h2>👨‍💻 Developers</h2>

<div class="dev-card">
<b>Kush Suchdeo</b> — Frontend Developer<br>
UI design, Dashboard, History UI, Routing, Integration & Project Structure
</div>

<div class="dev-card">
<b>Shivansh</b> — Backend + AI Developer<br>
API development, Authentication, Database, AI Image Processing, Model Logic
</div>

<p style="margin-top:30px;font-size:14px;color:#555;">
© Project-H | 2025 — Solar Optimization Using Computer Vision
</p>

</body>
</html>
