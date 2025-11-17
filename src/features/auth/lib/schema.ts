import * as z from "zod";
import {
  createNonEmptyStringField,
  createLoginField,
  createPasswordField,
} from "./utils.shared";

const passwordSchema = createPasswordField()
  .regex(/[a-zA-Z]/, { error: "At least one letter" })
  .regex(/[0-9]/, { error: "At least one number" })
  .regex(/[^a-zA-Z0-9]/, { error: "At least one special character" });

export const signUpSchema = z
  .strictObject({
    login: createLoginField(),
    password: passwordSchema,
    passwordConfirm: z.string().trim(),
  })
  .required()
  .refine((data) => data.password === data.passwordConfirm, {
    error: "Passwords do not match",
    path: ["passwordConfirm"],
  });

export const signInSchema = z
  .strictObject({
    login: createNonEmptyStringField("username"),
    password: createNonEmptyStringField("password"),
  })
  .required();

export type SignInFields = z.infer<typeof signInSchema>;
