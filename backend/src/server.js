import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.routes.js";
import privateRoutes from "./routes/private.routes.js";



const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/private", privateRoutes);

app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
