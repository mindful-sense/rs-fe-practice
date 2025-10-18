import { ROLE_ID } from "@/constants";
import { getTimestamp } from "@/utils";
import { verifySession } from "../auth/session";
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
      ROLE_ID.READER,
    ],
  });

  return creationUserSchema.parse(rows[0]);
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

  return authUserSchema.parse(rows[0]);
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

  return publicUserSchema.parse(rows[0]);
};
