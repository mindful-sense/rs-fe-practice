import * as z from "zod";
import { userSchema } from "@/lib/shared";

export const sessionUserSchema = userSchema.pick({
  userId: true,
  login: true,
  roleId: true,
});

export const tableUserSchema = userSchema
  .omit({ password: true, salt: true })
  .array()
  .min(1, "There must be at least one user in the database");

export const publicUserSchema = userSchema.pick({ login: true });

export type SessionUser = z.infer<typeof sessionUserSchema>;
export type TableUser = z.infer<typeof tableUserSchema.element>;
export type PublicUser = z.infer<typeof publicUserSchema>;
