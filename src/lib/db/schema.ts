import * as z from "zod";
import { type Role, isRole } from "@/config";
import {
  createLoginField,
  createPasswordField,
  createNonEmptyStringField,
} from "@/features/auth/shared";

const userDBSchema = z.strictObject({
  id: z
    .int()
    .positive()
    .transform((value) => String(value)),
  login: createLoginField(),
  password: createPasswordField(),
  registered_at: createNonEmptyStringField(),
  role_id: z
    .int()
    .refine(isRole, { error: "Invalid role id" }) as z.ZodType<Role>,
});

export const authUserSchema = userDBSchema
  .omit({ registered_at: true })
  .transform((data) => ({
    userId: data.id,
    login: data.login,
    password: data.password,
    roleId: data.role_id,
  }));

export const userSchema = userDBSchema
  .omit({ password: true })
  .transform((data) => ({
    userId: data.id,
    login: data.login,
    roleId: data.role_id,
  }));

export type AuthUser = z.infer<typeof authUserSchema>;
export type User = z.infer<typeof userSchema>;
