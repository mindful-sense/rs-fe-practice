import "server-only";
import * as z from "zod";

import { ROLES } from "@/config";
import { delay, getTimestampWithoutTime } from "@/lib/shared";
import { db } from "./db";
import { type User, type AuthUser, authUserSchema, userSchema } from "./schema";

const parseSingleRow = <Schema extends z.ZodPipe>({
  schema,
  row,
  error,
}: {
  schema: Schema;
  row: unknown;
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
}): Promise<User | null> => {
  await delay();

  const timestamp = getTimestampWithoutTime(new Date());
  const row = db
    .prepare(
      "INSERT INTO users(login, password, registered_at, role_id) VALUES (?, ?, ?, ?) RETURNING id, login, role_id",
    )
    .get(login, password, timestamp, ROLES.READER);

  if (!row) return null;

  return parseSingleRow({
    schema: userSchema,
    row,
    error: "Failed to create a new user",
  });
};

export const isLoginTaken = async (login: string): Promise<boolean> => {
  await delay();
  const row = db
    .prepare("SELECT 1 FROM users WHERE login = ? LIMIT 1")
    .get(login);
  return !!row;
};

export const getAuthUserByLogin = async (
  login: string,
): Promise<AuthUser | null> => {
  await delay();

  const row = db
    .prepare(
      "SELECT id, login, role_id, password FROM users WHERE login = ? LIMIT 1",
    )
    .get(login);

  if (!row) return null;

  return parseSingleRow({
    schema: authUserSchema,
    row,
    error: `Failed to fetch the user ${login}`,
  });
};

export const getUserById = async (userId: string): Promise<User | null> => {
  await delay();

  const row = db
    .prepare("SELECT id, login, role_id FROM users WHERE id = ? LIMIT 1")
    .get(userId);

  if (!row) return null;

  return parseSingleRow({
    schema: userSchema,
    row,
    error: "Failed to get the user",
  });
};
