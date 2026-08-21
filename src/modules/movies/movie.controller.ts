import type { Request, Response } from "express";
import { createMovieSchema, updateMovieSchema } from "./movie.schema.js";

import {
  createMovie,
  deleteMovie,
  getMovies,
  getMovieById,
  updateMovie
} from "./movie.service.js";
import { create } from "node:domain";
import { success } from "zod";

export async function createMovieController(req: Request, res: Response) {
  const result = createMovieSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: result.error.flatten()
    });
  }

  try {
    const movie = await createMovie(result.data);
    return res.status(201).json({
      success: true,
      data: movie
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}

export async function getMoviesController(_req: Request, res: Response) {
  try {
    const movies = await getMovies();
    return res.status(200).json({
      success: true,
      data: movies
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

export async function getMovieByIdController(req: Request, res: Response) {
  try {
    const movie = await getMovieById(req.params.id as string);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found"
      });
    }
    return res.status(200).json({
      success: true,
      data: movie
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}

export async function updateMovieController(req: Request, res: Response) {
  const result = updateMovieSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failes",
      errors: result.error.flatten()
    });
  }
  try {
    const movie = await updateMovie(req.params.id as string, result.data);
    return res.status(200).json({
      success: true,
      data: movie
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}

export async function deleteMovieController(req: Request, res: Response) {
  try {
    await deleteMovie(req.params.id as string);
    return res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}
