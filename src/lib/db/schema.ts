import * as z from "zod";
import { type Role, isRole } from "@/config";
import { createRangeStringSchema } from "@/features/auth/lib/utils";

import {
  LOGIN_MIN_LENGTH,
  LOGIN_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from "@/features/auth/lib/constants";

const userDBSchema = z.strictObject({
  id: z
    .int()
    .positive()
    .transform((value) => String(value)),
  login: createRangeStringSchema(LOGIN_MIN_LENGTH, LOGIN_MAX_LENGTH, "Login"),
  password: createRangeStringSchema(
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
    "Password",
  ),
  registered_at: z.string().nonempty(),
  role_id: z.custom<Role>(
    (value) =>
      typeof value === "number" && Number.isInteger(value) && isRole(value),
    { error: "Invalid role id" },
  ),
});

export const authUserSchema = userDBSchema
  .omit({ registered_at: true })
  .transform((data) => ({
    userId: data.id,
    login: data.login,
    password: data.password,
    roleId: data.role_id,
  }));

export const publicUserSchema = userDBSchema
  .omit({ password: true })
  .transform((data) => ({
    userId: data.id,
    login: data.login,
    roleId: data.role_id,
  }));

export type AuthUser = z.infer<typeof authUserSchema>;
export type PublicUser = z.infer<typeof publicUserSchema>;
