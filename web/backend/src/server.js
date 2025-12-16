import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";
import { appConfig } from "./config/appConfig.js";

const startServer = async () => {
  await connectDB(); // Connect to DB only once

  app.listen(appConfig.PORT, () => {
    console.log(`🚀 Server running on port ${appConfig.PORT}`);
  });
};

startServer(); // START SERVER ONLY ONCE
