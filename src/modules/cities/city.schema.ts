import { z } from "zod";

export const createCitySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "city name must be at least 2 character")
    .max(100),

  state: z
    .string()
    .trim()
    .min(2, "State name must be at least 2 character")
    .max(100)
});

export const updateCitySchema = createCitySchema.partial();

export type CreateCityInput = z.infer<typeof createCitySchema>;
export type UpdateCityInput = z.infer<typeof updateCitySchema>;
