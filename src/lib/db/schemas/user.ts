import * as z from "zod";
import { AUTH_CONFIG, ROLES } from "@/lib/constants";

export const roleIdSchema = z.enum(ROLES);

export const userSchema = z.strictObject({
  userId: z.uuid(),
  login: z.string().min(1),
  password: z
    .string()
    .length(AUTH_CONFIG.PASSWORD_BYTES * 2, "Password must be 32 characters")
    .regex(/^[0-9A-Fa-f]+$/, "Invalid HEX format"),
  salt: z
    .string()
    .length(AUTH_CONFIG.SALT_BYTES * 2, "Salt must be 32 characters")
    .regex(/^[0-9A-Fa-f]+$/, "Invalid HEX format"),
  roleId: roleIdSchema,
  registeredAt: z.iso.date(),
  updatedAt: z.iso.date(),
});

export type User = z.infer<typeof userSchema>;
export type RoleId = z.infer<typeof roleIdSchema>;

export type UserId = User["userId"];
