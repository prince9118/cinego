import type { Request, Response } from "express";
import { createCitySchema, updateCitySchema } from "./city.schema";
import {
  createCity,
  deleteCity,
  getCities,
  getCityById,
  updateCity
} from "./city.service";
import { error } from "node:console";

export async function createCityController(req: Request, res: Response) {
  const result = createCitySchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: result.error.flatten()
    });
  }
  try {
    const city = await createCity(result.data);
    return res.status(201).json({
      success: true,
      data: city
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: true,
      message: "Internal server Error"
    });
  }
}

export async function getCitiesController(_req: Request, res: Response) {
  try {
    const cities = await getCities();
    return res.status(200).json({
      success: true,
      data: cities
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server Error"
    });
  }
}

export async function getCityByIdController(req: Request, res: Response) {
  try {
    const city = await getCityById(req.params.id as string);
    if (!city) {
      return res.status(404).json({
        success: true,
        message: "City not found"
      });
    }
    return res.status(200).json({
      success: true,
      data: city
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}

export async function updateCityController(req: Request, res: Response) {
  const result = updateCitySchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: result.error.flatten()
    });
  }
  try {
    const city = await updateCity(req.params.id as string, result.data);

    return res.status(200).json({
      success: true,
      data: city
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server error"
    });
  }
}

export async function deleteCityController(req: Request, res: Response) {
  try {
    await deleteCity(req.params.id as string);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}
