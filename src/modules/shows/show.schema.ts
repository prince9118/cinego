import { z } from "zod";

export const createShowSchema = z.object({
  movieId: z.uuid("Invalid movie ID"),

  screenId: z.uuid("Invalid screen ID"),

  startTime: z.coerce.date(),

  endTime: z.coerce.date()
});

export const updateShowSchema = z.object({
  startTime: z.coerce.date().optional(),

  endTime: z.coerce.date().optional()
});

export type CreateShowInput = z.infer<typeof createShowSchema>;

export type UpdateShowInput = z.infer<typeof updateShowSchema>;
