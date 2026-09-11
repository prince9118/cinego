import { z } from "zod";

export const createShowSchema = z.object({
  movieId: z.uuid("Invalid movie ID"),

  screenId: z.uuid("Invalid screen ID"),

  startTime: z.coerce.date(),

  endTime: z.coerce.date()
});

e
