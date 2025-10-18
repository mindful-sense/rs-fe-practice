import * as z from "zod";
import { ROLE_ID } from "@/constants";
import {
  LOGIN_MIN_LENGTH,
  LOGIN_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from "../constants";
import { createStringSchema } from "../utils";

const userDBSchema = z.strictObject({
  id: z.int().positive(),
  login: createStringSchema(LOGIN_MIN_LENGTH, LOGIN_MAX_LENGTH, "Login"),
  password: createStringSchema(
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
    "Password",
  ),
  registered_at: z.string(),
  role_id: z.enum(ROLE_ID),
});

export const authUserSchema = userDBSchema
  .pick({ id: true, password: true })
  .transform((data) => ({
    userId: String(data.id),
    password: data.password,
  }));

export const creationUserSchema = userDBSchema
  .pick({ id: true })
  .transform((data) => ({
    userId: String(data.id),
  }));

export const publicUserSchema = userDBSchema
  .omit({ password: true })
  .transform((data) => ({
    userId: String(data.id),
    login: data.login,
    registeredAt: data.registered_at,
    roleId: data.role_id,
  }));

export type AuthUser = z.infer<typeof authUserSchema>;
export type CreationUser = z.infer<typeof creationUserSchema>;
export type PublicUser = z.infer<typeof publicUserSchema>;
