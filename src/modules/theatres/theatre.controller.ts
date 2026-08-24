import type { Request, Response } from "express";

import { createTheatreScheam, updateTheatreSchema } from "./theatre.schema";

import {
  createTheatre,
  deleteTheatre,
  getTheatreById,
  getTheatres,
  updateTheatre
} from "./theatre.service";

export async function createTheatreController(req: Request, res: Response) {
  const result = createTheatreScheam.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: true,
      message: "Validation failed",
      error: result.error.flatten()
    });
  }
  try {
    const theatre = await createTheatre(result.data);
    return res.status(201).json({
      success: true,
      data: theatre
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      messaege: "Internal server error"
    });
  }
}

export async function getTheatresController(_req: Request, res: Response) {
  try {
    const theatre = await getTheatres();
    return res.status(200).json({
      success: true,
      data: theatre
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}
export async function getTheatreByIdController(req: Request, res: Response) {
  try {
    const theatre = await getTheatreById(req.params.id as string);
    if (!theatre) {
      return res.status(400).json({
        success: false,
        message: "theatre not found"
      });
    }
    return res.status(200).json({
      success: true,
      data: theatre
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}

export async function updateTheatreController(req: Request, res: Response) {
  const result = updateTheatreSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: result.error.flatten()
    });
  }

  try {
    const theatre = await updateTheatre(req.params.id as string, result.data);

    return res.status(200).json({
      success: true,
      data: theatre
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

export async function deleteTheatreController(req: Request, res: Response) {
  try {
    await deleteTheatre(req.params.id as string);

    return res.status(204).send();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}
