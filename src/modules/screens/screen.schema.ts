import { z } from "zod";

export const createScreenSchema = z.object({
  name: z.string().trim().min(1, "Screen name is required").max(100),

  theatreId: z.uuid("Invalid theatre ID")
});

export const updateScreenSchema = createScreenSchema
  .omit({
    theatreId: true
  })
  .partial();

export type CreateScreenInput = z.infer<typeof createScreenSchema>;
export type UpdateScreenInput = z.infer<typeof updateScreenSchema>;
