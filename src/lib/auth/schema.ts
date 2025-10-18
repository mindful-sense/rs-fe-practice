import * as z from "zod";
import {
  LOGIN_MIN_LENGTH,
  LOGIN_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from "../constants";
import { createStringSchema } from "../utils";

const passwordSchema = createStringSchema(
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  "Password",
)
  .regex(/[a-zA-Z]/, { message: "Contain at least one letter" })
  .regex(/[0-9]/, { message: "Contain at least one number" })
  .regex(/[^a-zA-Z0-9]/, {
    message: "Contain at least one special character",
  });

export const signupSchema = z
  .strictObject({
    login: createStringSchema(LOGIN_MIN_LENGTH, LOGIN_MAX_LENGTH, "Login"),
    password: passwordSchema,
    passwordConfirm: z.string().trim(),
  })
  .required()
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

export const signinSchema = z
  .strictObject({
    login: z.string().trim(),
    password: z.string().trim(),
  })
  .required();
