import * as z from "zod";
import { AUTH_CONFIG, ROLES } from "../constants";

export const roleIdSchema = z.enum(ROLES);

const userBaseSchema = z.strictObject({
  id: z.uuid(),
  login: z.string().min(1),
  password: z
    .string()
    .length(AUTH_CONFIG.PASSWORD_BYTES * 2, "Password must be 32 characters")
    .regex(/^[0-9A-Fa-f]+$/, "Invalid HEX format"),
  salt: z
    .string()
    .length(AUTH_CONFIG.SALT_BYTES * 2, "Salt must be 32 characters")
    .regex(/^[0-9A-Fa-f]+$/, "Invalid HEX format"),
  role_id: roleIdSchema,
  registered_at: z.iso.date(),
  updated_at: z.iso.date(),
});

export const userSchema = userBaseSchema.transform((data) => ({
  userId: data.id,
  login: data.login,
  password: data.password,
  salt: data.salt,
  roleId: data.role_id,
  registeredAt: data.registered_at,
  updatedAt: data.updated_at,
}));

export const sessionUserSchema = userBaseSchema
  .pick({
    id: true,
    login: true,
    role_id: true,
  })
  .transform((data) => ({
    userId: data.id,
    login: data.login,
    roleId: data.role_id,
  }));

export const tableUserSchema = z
  .array(
    userBaseSchema.omit({ password: true, salt: true }).transform((data) => ({
      userId: data.id,
      login: data.login,
      roleId: data.role_id,
      registeredAt: data.registered_at,
      updatedAt: data.updated_at,
    })),
  )
  .min(1, "There must be at least one user in the database");

export const sessionSchema = z.strictObject({
  sessionId: z
    .string()
    .length(AUTH_CONFIG.SESSION_BYTES * 2, "Session ID must be 64 characters")
    .regex(/^[0-9A-Fa-f]+$/, "Invalid HEX format"),
  userId: z.uuid(),
  expiresAt: z.number().refine((timestamp) => timestamp > Date.now(), {
    error: "Expiration date should be set into the future",
  }),
});

export const updateSessionSchema = sessionSchema.omit({ userId: true });

export type User = z.infer<typeof userSchema>;
export type SessionUser = z.infer<typeof sessionUserSchema>;
export type TableUser = z.infer<typeof tableUserSchema.element>;
export type Session = z.infer<typeof sessionSchema>;
export type UpdateSession = z.infer<typeof updateSessionSchema>;
export type RoleId = z.infer<typeof roleIdSchema>;

export type UserId = User["userId"];
export type SessionId = Session["sessionId"];
