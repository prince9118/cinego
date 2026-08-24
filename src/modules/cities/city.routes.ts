import { Router } from "express";

import {
  createCityController,
  deleteCityController,
  getCitiesController,
  getCityByIdController,
  updateCityController
} from "./city.controller.js";

import { authMiddleware } from "../../middleware/auth.middleware.js";
import { requireRole } from "../../middleware/role.middleware.js";

const router = Router();

router.get("/", getCitiesController);
router.get("/:id", getCityByIdController);

router.post("/", authMiddleware, requireRole("ADMIN"), createCityController);
router.patch(
  "/:id",
  authMiddleware,
  requireRole("ADMIN"),
  updateCityController
);

router.delete(
  "/:id",
  authMiddleware,
  requireRole("ADMIN"),
  deleteCityController
);

export default router;
