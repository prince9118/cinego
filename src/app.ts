import express from "express";
import { success } from "zod";
import authRoutes from "./modules/auth/auth.routes.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Api Health checked"
  });
});

app.use("/auth", authRoutes);

export default app;
