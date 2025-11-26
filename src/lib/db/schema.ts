import * as z from "zod";
import { ROLES } from "@/config";

export const userSchema = z
  .strictObject({
    id: z.nanoid().nonempty(),
    login: z.string().nonempty(),
    password: z.string().nonempty(),
    salt: z.string().nonempty(),
    role_id: z.enum(ROLES),
    registered_at: z.iso.date(),
    updated_at: z.iso.date(),
  })
  .transform((data) => ({
    userId: data.id,
    login: data.login,
    password: data.password,
    salt: data.salt,
    roleId: data.role_id,
    registeredAt: data.registered_at,
    updatedAt: data.updated_at,
  }));

export type User = z.infer<typeof userSchema>;
export type UserId = User["userId"];
