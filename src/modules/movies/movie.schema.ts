import { z } from "zod";
export const createMovieSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  description: z.string().trim().max(5000).optional(),
  duration: z.number().int().positive("Duration must be positive"),
  language: z.string().trim().min(1).max(50),
  genre: z.string().trim().min(1).max(100),
  releaseDate: z.coerce.date()
});

export const updateMovieSchema = createMovieSchema.partial();

export type CreateMovieInput = z.infer<typeof createMovieSchema>;
export type UpdateMovieInput = z.infer<typeof updateMovieSchema>;
