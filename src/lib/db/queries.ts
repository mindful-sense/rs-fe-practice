import { ROLE } from "@/config";
import { verifySession } from "@/features/auth/lib/session";
import { getTimestamp } from "@/lib/utils";
import { client } from "./db";

import {
  type AuthUser,
  type CreationUser,
  type PublicUser,
  authUserSchema,
  creationUserSchema,
  publicUserSchema,
} from "./schema";

export const createUser = async (
  login: string,
  password: string,
): Promise<CreationUser> => {
  const { rows } = await client.execute({
    sql: "INSERT INTO users(login, password, registered_at, role_id) VALUES (?, ?, ?, ?) RETURNING id",
    args: [
      login,
      password,
      getTimestamp({ date: new Date(), withTime: false }),
      ROLE.READER,
    ],
  });

  const result = creationUserSchema.safeParse(rows[0]);

  if (!result.success) {
    throw new Error("Failed to create a new user");
  }

  return result.data;
};

export const isLoginTaken = async (login: string): Promise<boolean> => {
  const { rows } = await client.execute({
    sql: "SELECT 1 FROM users WHERE login = ? LIMIT 1",
    args: [login],
  });
  return rows.length > 0;
};

export const getUserForAuth = async (
  login: string,
): Promise<AuthUser | null> => {
  const { rows } = await client.execute({
    sql: "SELECT id, password FROM users WHERE login = ? LIMIT 1",
    args: [login],
  });

  if (rows.length === 0) {
    return null;
  }

  const result = authUserSchema.safeParse(rows[0]);

  if (!result.success) {
    throw new Error(`Failed to fetch the user ${login}`);
  }

  return result.data;
};

export const getPublicUser = async (
  userId: string,
): Promise<PublicUser | null> => {
  const session = await verifySession();

  if (!session) {
    throw new Error("Failed to verify session");
  }

  const { rows } = await client.execute({
    sql: "SELECT id, login, registered_at, role_id FROM users WHERE id = ? LIMIT 1",
    args: [userId],
  });

  if (rows.length === 0) {
    return null;
  }

  const result = publicUserSchema.safeParse(rows[0]);

  if (!result.success) {
    throw new Error(`Failed to verify the user`);
  }

  return result.data;
};
