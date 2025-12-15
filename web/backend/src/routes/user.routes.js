import { Router } from "express";
import { getUsers } from "../controllers/index.js";

const router = Router();

// Just a test route to confirm backend routing works
router.get("/", getUsers);

export { router as userRouter };
