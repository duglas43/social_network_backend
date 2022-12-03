import express from "express";
import { login, getMe } from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();
router.post("/login", login);
router.get("/me", verifyToken, getMe);
export default router;
