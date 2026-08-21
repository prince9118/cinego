import { email, z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z
    .string()
    .email("Invalid email address")
    .transform((email) => email.toLowerCase().trim()),
  password: z.string().min(8, "Password must be at least 8 characters").max(100)
});

export type SignUpInput = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .transform((email) => email.toLowerCase().trim()),
  password: z.string().min(1, "Password is required")
});

export type LoginInput = z.infer<typeof loginSchema>;
