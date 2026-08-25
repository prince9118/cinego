import type { Request, Response } from "express";
import { createScreenSchema, updateScreenSchema } from "./screen.schema";
import {
  createScreen,
  deleteScreen,
  getScreenById,
  getScreens,
  updateScreen
} from "./screen.service";
import { error } from "node:console";

export async function createScreenController(req: Request, res: Response) {
  const result = createScreenSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: result.error.flatten()
    });
  }
  try {
    const screen = await createScreen(result.data);
    return res.status(201).json({
      success: true,
      data: screen
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

export async function getScreenController(_req: Request, res: Response) {
  try {
    const screen = await getScreens();
    return res.status(200).json({
      success: true,
      data: screen
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

export async function getScreenByIdController(req: Request, res: Response) {
  try {
    const screen = await getScreenById(req.params.id as string);
    if (!screen) {
      return res.status(404).json({
        success: true,
        message: "Screen not found "
      });
    }
    return res.status(200).json({
      success: true,
      data: screen
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

export async function updateScreenController(req: Request, res: Response) {
  const result = updateScreenSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      error: result.error.flatten()
    });
  }
  try {
    const screen = await updateScreen(req.params.id as string, result.data);
    return res.status(200).json({
      success: true,
      data: screen
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}

export async function deleteScreenController(req: Request, res: Response) {
  try {
    await deleteScreen(req.params.id as string);

    return res.status(204).send();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}
