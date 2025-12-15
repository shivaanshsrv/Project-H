import { Router } from "express";
import { registerUser, loginUser } from "../controllers/index.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export { router as authRouter };
