import "server-only";
import * as z from "zod";
import { type Row } from "@libsql/client";

import { ROLES } from "@/config";
import { getTimestampWithoutTime } from "@/lib/shared";
import { client } from "./db";
import { type User, type AuthUser, authUserSchema, userSchema } from "./schema";

const parseSingleRow = <Schema extends z.ZodPipe>({
  schema,
  row,
  error,
}: {
  schema: Schema;
  row: Row;
  error: string;
}) => {
  const result = schema.safeParse(row);

  if (!result.success) {
    throw new Error(error);
  }

  return result.data;
};

export const createUser = async ({
  login,
  password,
}: {
  login: string;
  password: string;
}): Promise<User> => {
  const { rows } = await client.execute({
    sql: `
      INSERT INTO users(login, password, registered_at, role_id)
      VALUES (?, ?, ?, ?)
      RETURNING id, login, role_id
    `,
    args: [login, password, getTimestampWithoutTime(new Date()), ROLES.READER],
  });

  return parseSingleRow({
    schema: userSchema,
    row: rows[0],
    error: "Failed to create a new user",
  });
};

export const isLoginTaken = async (login: string): Promise<boolean> => {
  const { rows } = await client.execute({
    sql: "SELECT 1 FROM users WHERE login = ? LIMIT 1",
    args: [login],
  });
  return rows.length > 0;
};

export const getAuthUserByLogin = async (
  login: string,
): Promise<AuthUser | null> => {
  const { rows } = await client.execute({
    sql: `
      SELECT id, login, role_id, password
      FROM users
      WHERE login = ?
      LIMIT 1
    `,
    args: [login],
  });

  if (rows.length === 0) {
    return null;
  }

  return parseSingleRow({
    schema: authUserSchema,
    row: rows[0],
    error: `Failed to fetch the user ${login}`,
  });
};

export const getUserById = async (userId: string): Promise<User | null> => {
  const { rows } = await client.execute({
    sql: "SELECT id, login, role_id FROM users WHERE id = ? LIMIT 1",
    args: [userId],
  });

  if (rows.length === 0) {
    return null;
  }

  return parseSingleRow({
    schema: userSchema,
    row: rows[0],
    error: "Failed to get the user",
  });
};
