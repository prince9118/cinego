import { count } from "node:console";
import { z } from "zod";

export const seatRowSchema = z.object({
  row: z
    .string()
    .trim()
    .length(1, "Row must contain one character")
    .transform((value) => value.toUpperCase()),

  count: z.number().int().min(1).max(50),

  type: z.enum(["REGULAR", "PREMIUM", "RECLINER"])
});

export const seatLayoutSchema = z
  .object({
    rows: z.array(seatRowSchema).min(1).max(26)
  })
  .superRefine((data, ctx) => {
    const rows = data.rows.map((row) => row.row);

    const uniqueRows = new Set(rows);

    if (uniqueRows.size !== rows.length) {
      ctx.addIssue({
        code: "custom",
        message: "Duplicate row names are not allowed",
        path: ["rows"]
      });
    }
  });

export type seatLayoutInput = z.infer<typeof seatLayoutSchema>;
