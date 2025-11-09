import * as z from "zod";
import { ROLE } from "@/config";
import { createRangeStringSchema } from "@/features/auth/lib/utils";

import {
  LOGIN_MIN_LENGTH,
  LOGIN_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from "@/features/auth/lib/constants";

const userDBSchema = z.strictObject({
  id: z.int().positive(),
  login: createRangeStringSchema(LOGIN_MIN_LENGTH, LOGIN_MAX_LENGTH, "Login"),
  password: createRangeStringSchema(
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
    "Password",
  ),
  registered_at: z.string(),
  role_id: z.enum(ROLE),
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
