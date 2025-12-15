import dotenv from "dotenv";
dotenv.config();               // MUST BE LINE 1

import app from "./app.js";
import { connectDB } from "./config/db.js";
import { appConfig } from "./config/appConfig.js";

// connectDB();

app.listen(appConfig.PORT, () => {
    console.log(`🚀 Server running on port ${appConfig.PORT}`);
});
