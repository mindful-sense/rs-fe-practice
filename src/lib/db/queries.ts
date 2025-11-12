import * as z from "zod";
import { type Row } from "@libsql/client";

import { ROLES } from "@/config";
import { getTimestamp } from "@/lib/utils";
import { verifySession } from "@/features/auth/lib/session";
import { client } from "./db";

import {
  type AuthUser,
  type CreationUser,
  type PublicUser,
  authUserSchema,
  creationUserSchema,
  publicUserSchema,
} from "./schema";

const parseSingleRow = <Schema extends z.ZodPipe>(
  schema: Schema,
  row: Row,
  error: string,
): z.core.output<Schema> => {
  const result = schema.safeParse(row);

  if (!result.success) {
    throw new Error(error);
  }

  return result.data;
};

export const createUser = async (
  login: string,
  password: string,
): Promise<CreationUser> => {
  const { rows } = await client.execute({
    sql: "INSERT INTO users(login, password, registered_at, role_id) VALUES (?, ?, ?, ?) RETURNING id",
    args: [login, password, getTimestamp(new Date()), ROLES.READER],
  });

  return parseSingleRow(
    creationUserSchema,
    rows[0],
    "Failed to create a new user",
  );
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

  return parseSingleRow(
    authUserSchema,
    rows[0],
    `Failed to fetch the user ${login}`,
  );
};

export const getPublicUser = async (
  userId: string,
): Promise<PublicUser | null> => {
  const session = await verifySession();

  if (!session) {
    throw new Error("Failed to verify session");
  }

  const { rows } = await client.execute({
    sql: "SELECT id, login, role_id FROM users WHERE id = ? LIMIT 1",
    args: [userId],
  });

  if (rows.length === 0) {
    return null;
  }

  return parseSingleRow(publicUserSchema, rows[0], "Failed to verify the user");
};
