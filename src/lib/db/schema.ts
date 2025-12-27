import * as z from "zod";
import { CONFIG } from "@/features/auth/shared";
import { ROLES } from "@/lib/shared";

const userBaseSchema = z.strictObject({
  id: z.uuid(),
  login: z.string().min(1),
  password: z
    .string()
    .length(CONFIG.PASSWORD_BYTES * 2, "Password must be 32 characters")
    .regex(/^[0-9A-Fa-f]+$/, "Invalid HEX format"),
  salt: z
    .string()
    .length(CONFIG.SALT_BYTES * 2, "Salt must be 32 characters")
    .regex(/^[0-9A-Fa-f]+$/, "Invalid HEX format"),
  role_id: z.enum(ROLES),
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

export const safeUserSchema = userBaseSchema
  .omit({
    password: true,
    salt: true,
  })
  .transform((data) => ({
    userId: data.id,
    login: data.login,
    roleId: data.role_id,
    registeredAt: data.registered_at,
    updatedAt: data.updated_at,
  }));

export const sessionSchema = z.strictObject({
  sessionId: z
    .string()
    .length(CONFIG.SESSION_BYTES * 2, "Session ID must be 64 characters")
    .regex(/^[0-9A-Fa-f]+$/, "Invalid HEX format"),
  userId: z.uuid(),
  expiresAt: z.number().refine((timestamp) => timestamp > Date.now(), {
    message: "Expiration date should be set into the future",
  }),
});

export const updateSessionSchema = sessionSchema.omit({ userId: true });

export type User = z.infer<typeof userSchema>;
export type SafeUser = z.infer<typeof safeUserSchema>;
export type Session = z.infer<typeof sessionSchema>;
export type UpdateSession = z.infer<typeof updateSessionSchema>;

export type UserId = User["userId"];
export type SessionId = Session["sessionId"];
