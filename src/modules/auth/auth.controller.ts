import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "../../middleware/auth.middleware";
import { signUpSchema, loginSchema } from "./auth.schema";
import { signup, login } from "./auth.service";
import { success } from "zod";
import { prisma } from "../..//config/prisma.js";

export async function signUpController(req: Request, res: Response) {
  const result = signUpSchema.safeParse(req.body);
  //   console.log(result);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: result.error.flatten()
    });
  }
  try {
    const user = await signup(result.data);
    return res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    if (error instanceof Error && error.message === "User already exist") {
      return res.status(400).json({
        success: true,
        message: error.message
      });
    }
    console.log(error);
    return res.status(500).json({
      success: true,
      message: "Internal server Error"
    });
  }
}

export async function loginController(req: Request, res: Response) {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: result.error.flatten()
    });
  }

  try {
    const results = await login(result.data);
    return res.status(200).json({
      success: true,
      data: results
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Invalid email or password"
    ) {
      return res.status(401).json({
        success: false,
        message: error.message
      });
    }
    console.log(error);
    return res.status(500).json({
      success: true,
      message: "Internal server error"
    });
  }
}

export async function meController(req: AuthenticatedRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({
      success: true,
      message: "Authentication required"
    });
  }
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.userId
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true
    }
  });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }
  return res.status(200).json({
    success: true,
    data: user
  });
}
