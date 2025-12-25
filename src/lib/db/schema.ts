import * as z from "zod";
import { ROLES } from "@/lib/shared";

const userBaseSchema = z.strictObject({
  id: z.uuid(),
  login: z.string().min(1),
  password: z.string().min(1),
  salt: z.string().min(1),
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
  sessionId: z.uuid(),
  userId: z.uuid(),
  expiresAt: z.number(),
});

export type User = z.infer<typeof userSchema>;
export type SafeUser = z.infer<typeof safeUserSchema>;
export type Session = z.infer<typeof sessionSchema>;

export type UserId = User["userId"];
