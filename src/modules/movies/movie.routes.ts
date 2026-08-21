import { Router } from "express";
import {
  createMovieController,
  deleteMovieController,
  getMovieByIdController,
  getMoviesController,
  updateMovieController
} from "./movie.controller";

import { authMiddleware } from "../../middleware/auth.middleware";
import { requireRole } from "../../middleware/role.middleware";

const router = Router();

//public

router.get("/", getMoviesController);
router.get("/:id", getMovieByIdController);

//admin

router.post("/", authMiddleware, requireRole("ADMIN"), createMovieController);

router.patch(
  "/:id",
  authMiddleware,
  requireRole("ADMIN"),
  updateMovieController
);

router.delete(
  "/:id",
  authMiddleware,
  requireRole("ADMIN"),
  deleteMovieController
);

export default router;