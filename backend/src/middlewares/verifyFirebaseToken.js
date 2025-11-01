import admin from "../config/firebaseAdmin.js";

export const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.body.token;

  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Invalid token:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
