import * as z from "zod";

const loginRule = z
  .string()
  .trim()
  .min(3, { error: `Min 3 characters` })
  .max(30, { error: `Max 30 characters` });

const passwordRule = z
  .string()
  .trim()
  .min(6, { error: `Min 6 characters` })
  .max(50, { error: `Max 50 characters` })
  .regex(/[a-zA-Z]/, { error: "At least one letter" })
  .regex(/[0-9]/, { error: "At least one number" })
  .regex(/[^a-zA-Z0-9]/, { error: "At least one special character" });

export const signUpSchema = z
  .object({
    login: loginRule,
    password: passwordRule,
    passwordConfirm: z
      .string()
      .nonempty({ error: "Fill in your password again" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    error: "Passwords do not match",
    path: ["passwordConfirm"],
  });

export const signInSchema = z.object({
  login: z.string().nonempty({ error: "Fill in your username" }),
  password: z.string().nonempty({ error: "Fill in your password" }),
});

export type SignUp = z.infer<typeof signUpSchema>;
export type SignIn = z.infer<typeof signInSchema>;
