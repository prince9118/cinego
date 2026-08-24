import { Router } from "express";

import {
  createTheatreController,
  deleteTheatreController,
  getTheatreByIdController,
  getTheatresController,
  updateTheatreController
} from "./theatre.controller.js";

import { authMiddleware } from "../../middleware/auth.middleware.js"
import { requireRole } from "../../middleware/role.middleware.js"

const router = Router();

router.get("/", getTheatresController);

router.get("/:id", getTheatreByIdController);

router.post("/", authMiddleware, requireRole("ADMIN"), createTheatreController);

router.patch(
  "/:id",
  authMiddleware,
  requireRole("ADMIN"),
  updateTheatreController
);

router.delete(
  "/:id",
  authMiddleware,
  requireRole("ADMIN"),
  deleteTheatreController
);

export default router;
