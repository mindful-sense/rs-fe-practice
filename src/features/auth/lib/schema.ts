import * as z from "zod";
import { USERNAME_NOT_FOUND } from "@/lib/constants";
import { sessionSchema } from "@/lib/shared";

const loginRule = z
  .string()
  .trim()
  .min(3, { error: "Min 3 characters" })
  .max(30, { error: "Max 30 characters" })
  .refine((data) => data !== USERNAME_NOT_FOUND, {
    error: "This username is reserved and can't be used",
  });

const passwordRule = z
  .string()
  .trim()
  .min(6, { error: "Min 6 characters" })
  .max(50, { error: "Max 50 characters" })
  .regex(/[a-zA-Z]/, { error: "At least one letter" })
  .regex(/[0-9]/, { error: "At least one number" })
  .regex(/[^a-zA-Z0-9]/, { error: "At least one special character" });

export const signUpSchema = z
  .object({
    login: loginRule,
    password: passwordRule,
    passcheck: z.string().min(1, { error: "Fill in your password again" }),
  })
  .refine((data) => data.password === data.passcheck, {
    error: "Passwords do not match",
    path: ["passcheck"],
  });

export const signInSchema = z.object({
  login: z.string().min(1, { error: "Fill in your username" }),
  password: z.string().min(1, { error: "Fill in your password" }),
});

export const updateSessionSchema = sessionSchema.omit({ userId: true });

export type SignUp = z.infer<typeof signUpSchema>;
export type SignIn = z.infer<typeof signInSchema>;
export type UpdateSession = z.infer<typeof updateSessionSchema>;
