import { Router } from "express";
import { createSeatLayoutController } from "./seat.controller";

import { authMiddleware } from "../../middleware/auth.middleware";
import { requireRole } from "../../middleware/role.middleware";
import {getScreenSeatsController}from "./seat.controller";

const router = Router();

router.post(
  "/screens/:screenId/seats/layout",
  authMiddleware,
  requireRole("ADMIN"),
  createSeatLayoutController
);
router.get("/screens/:screenId/seats", getScreenSeatsController);
export default router;
