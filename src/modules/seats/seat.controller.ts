import type { Request, Response } from "express";

import { seatLayoutSchema } from "./seat.schema";

import { createSeatLayout, getScreenSeats } from "./seat.service";

export async function createSeatLayoutController(req: Request, res: Response) {
  const result = seatLayoutSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: result.error.flatten()
    });
  }
  try {
    const results = await createSeatLayout(
      req.params.screenId as string,
      result.data
    );
    return res.status(201).json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}

export async function getScreenSeatsController(req: Request, res: Response) {
  try {
    const seats = await getScreenSeats(req.params.screenId as string);

    return res.status(200).json({
      success: true,
      data: seats
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}
