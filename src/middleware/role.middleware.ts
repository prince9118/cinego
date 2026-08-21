import type { Request, Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "./auth.middleware";

type Role = "USER" | "ADMIN";

export function requireRole(role: Role) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: true,
        message: "Authentication required"
      });
    }
    if (req.user.role !== role) {
      return res.status(403).json({
        success: false,
        message: "Forbidden"
      });
    }
    next();
  };
}
