import express from "express";
import cors from "cors";
import { authRouter } from "./routes/index.js";

import { aiRouter, userRouter } from "./routes/index.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

// ---------- Global Middlewares ----------
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ---------- API Routes ----------
app.use("/api/ai", aiRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

// ---------- Error Handler ----------
app.use(errorMiddleware);

export default app;
