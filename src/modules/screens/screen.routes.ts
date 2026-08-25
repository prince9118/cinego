import { Router } from "express";

import {
  createScreenController,
  deleteScreenController,
  getScreenByIdController,
  getScreenController,
  updateScreenController
} from "./screen.controller.js";

import { authMiddleware } from "../../middleware/auth.middleware.js";
import { requireRole } from "../../middleware/role.middleware.js";

const router = Router();

router.get("/", getScreenController);

router.get("/:id", getScreenByIdController);

router.post("/", authMiddleware, requireRole("ADMIN"), createScreenController);
router.patch(
  "/:id",
  authMiddleware,
  requireRole("ADMIN"),
  updateScreenController
);
router.delete(
  "/:id",
  authMiddleware,
  requireRole("ADMIN"),
  deleteScreenController
);
export default router;
