import { Router } from "express";
import {
  signUpController,
  loginController,
  meController
} from "./auth.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { requireRole } from "../../middleware/role.middleware";
const router = Router();

router.post("/signup", signUpController);
router.post("/login", loginController);
router.get("/me", authMiddleware, meController);

// router.get("/admin-test", authMiddleware, requireRole("ADMIN"), (_req, res) => {
//   return res.json({
//     success: true,
//     message: "You are an admin"
//   });
// });
export default router;
