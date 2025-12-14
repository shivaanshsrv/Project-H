<h1 align="center">PROJECT-H: Smart Solar Rooftop Assessment System</h1>

<p align="center">
  <b>AI‑powered rooftop analysis using SAM, YOLOv8, geometric simulation and microservice architecture.</b>
</p>

<hr>

<h2>📌 About the Project</h2>
<p>
  PROJECT‑H is an intelligent solar panel assessment system designed to analyze rooftops 
  using deep learning, classical computer vision, and spatial simulation techniques. 
  The system identifies rooftop boundaries, detects obstructions, generates sunlight 
  exposure heatmaps, and recommends optimal solar panel placement with estimated energy output.
</p>

<p>
  The project operates on a microservice-based architecture, where a dedicated Python AI 
  service performs image processing and a Node.js backend manages API flow, data handling, 
  and communication with the frontend.
</p>

<hr>

<h2>🛠 Technologies & Tools Used</h2>

<h3>AI / Machine Learning</h3>
<ul>
  <li><b>Segment Anything Model (SAM)</b> – Rooftop segmentation</li>
  <li><b>YOLOv8-Seg</b> – Obstruction and shadow detection</li>
  <li><b>OpenCV</b> – Preprocessing, mask operations, heatmap generation</li>
  <li><b>NumPy</b> – Matrix operations</li>
  <li><b>Flask</b> – AI microservice backend</li>
</ul>

<h3>Backend</h3>
<ul>
  <li><b>Node.js</b> + <b>Express.js</b></li>
  <li><b>Mongoose</b> for MongoDB interaction</li>
  <li><b>Axios</b> – Communication with AI service</li>
  <li><b>Multer</b> – Image upload handling</li>
</ul>

<h3>Frontend</h3>
<ul>
  <li><b>React.js</b> + Vite</li>
  <li>Canvas-based visualization for heatmaps and masks</li>
</ul>

<h3>Other Tools</h3>
<ul>
  <li>Docker (optional for deployment)</li>
  <li>Postman / cURL for API testing</li>
</ul>

<hr>

<h2>⚙️ How the System Works</h2>

<ol>
  <li>
    <b>Image Upload:</b>  
    User uploads a rooftop image through the frontend.
  </li>

  <li>
    <b>Preprocessing:</b>  
    The Python AI service normalizes, rescales, and prepares the image for segmentation.
  </li>

  <li>
    <b>Segmentation Pipeline:</b>
    <ul>
      <li>SAM extracts rooftop boundaries.</li>
      <li>YOLOv8 identifies obstructions such as tanks, AC units, or objects.</li>
      <li>Shadow regions are detected and suppressed.</li>
    </ul>
  </li>

  <li>
    <b>Heatmap Generation:</b>  
    A simulated sunlight intensity heatmap is generated based on rooftop usability 
    and obstruction distances.
  </li>

  <li>
    <b>Panel Recommendation:</b>  
    The system analyzes all usable areas and places virtual solar panels 
    based on dimensions, spacing, and sunlight thresholds.
  </li>

  <li>
    <b>Energy Estimation:</b>  
    Total potential power output is calculated using panel count and wattage rating.
  </li>

  <li>
    <b>Frontend Visualization:</b>  
    Heatmaps, masks, and recommended panel positions are displayed to the user.
  </li>
</ol>

<hr>

<h2>📁 Project Architecture</h2>
<ul>
  <li><b>AI Microservice</b> (Python, Flask)</li>
  <li><b>Backend API</b> (Node.js, Express)</li>
  <li><b>Frontend UI</b> (React, Vite)</li>
</ul>

<p>
  The AI and backend communicate using REST APIs, making the system scalable, modular, 
  and suitable for production deployment.
</p>

<hr>

<h2>🚀 Features</h2>
<ul>
  <li>Automated rooftop detection</li>
  <li>Accurate obstruction segmentation</li>
  <li>Heatmap‑based sunlight simulation</li>
  <li>Smart solar panel placement algorithm</li>
  <li>Energy generation estimation</li>
  <li>Clean and interactive web interface</li>
</ul>

<hr>

<h2>👨‍💻 About the Developer</h2>
<p>
  Passionate about AI, full‑stack development, and building systems that solve 
  real‑world problems. PROJECT‑H is a research‑driven initiative focused on sustainability, 
  computer vision, and applied machine intelligence.
</p>

<hr>
