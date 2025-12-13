import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/api/status", (req, res) => {
  res.send("Hello Shivansh, this message is comming from backend :)");
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
