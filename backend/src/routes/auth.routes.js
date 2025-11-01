import express from "express";
import { verifyFirebaseToken } from "../middlewares/verifyFirebaseToken.js";
import { googleLogin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/google-login", verifyFirebaseToken, googleLogin);

export default router;
