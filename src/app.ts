import express from "express";
import { success } from "zod";
import authRoutes from "./modules/auth/auth.routes.js";
import movieRoutes from "./modules/movies/movie.routes.js";
import cityRoutes from "./modules/cities/city.routes.js";
import theatreRoutes from "./modules/theatres/theatre.routes.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Api Health checked"
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movies", movieRoutes);

app.use("/api/v1/cities", cityRoutes);
app.use("/api/v1/theatres", theatreRoutes);

export default app;
