import express from "express";
import { success } from "zod";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Api Health checked"
  });
});

export default app;
