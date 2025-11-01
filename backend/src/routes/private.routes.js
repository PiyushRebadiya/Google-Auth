import express from "express";
import { verifyFirebaseToken } from "../middlewares/verifyFirebaseToken.js";

const router = express.Router();

router.get("/", verifyFirebaseToken, (req, res) => {
  res.json({
    message: `Welcome to Private API, ${req.user.email}!`,
  });
});

export default router;
