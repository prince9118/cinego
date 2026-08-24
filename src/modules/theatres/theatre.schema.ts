import { z } from "zod";

export const createTheatreScheam = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Theatre name must be at least 2 characters")
    .max(150),

  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5  characters")
    .max(500),
  cityId: z.uuid("Invalid city ID")
});

export const updateTheatreSchema = createTheatreScheam.partial();

export type CreateTheatreInput = z.infer<typeof createTheatreScheam>;

export type UpdateTheatreInput = z.infer<typeof updateTheatreSchema>;
