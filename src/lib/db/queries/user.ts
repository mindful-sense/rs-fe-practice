import "server-only";
import { nanoid } from "nanoid";
import { ROLES } from "@/config";
import {
  type User,
  type UserId,
  userSchema,
  getTimestampWithoutTime,
} from "@/lib/shared";
import { db } from "../db";

const insertUserStmt = db.prepare(`
  INSERT INTO users(id, login, password, salt, role_id, registered_at, updated_at)
  VALUES (@userId, @login, @password, @salt, @roleId, @registeredAt, @updatedAt)
  RETURNING id, login, password, salt, role_id, registered_at, updated_at
`);

const getUserStmt = db.prepare(`
  SELECT id, login, password, salt, role_id, registered_at, updated_at
  FROM users
  WHERE login = @login
  LIMIT 1
`);

export const insertUser = db.transaction(
  ({
    login,
    password,
    salt,
  }: Pick<User, "login" | "password" | "salt">): UserId => {
    const userId = nanoid();
    const registeredAt = getTimestampWithoutTime(new Date());
    const row = insertUserStmt.get({
      userId,
      login,
      password,
      salt,
      roleId: ROLES.READER,
      registeredAt,
      updatedAt: registeredAt,
    });

    if (!row) throw new Error("Unable to create an account");

    return userSchema.parse(row, {
      error: () => "Failed to register a new user",
    }).userId;
  },
);

export const getUserForLogin = (login: string): User => {
  const row = getUserStmt.get({ login });

  if (!row) throw new Error("User is not found");

  return userSchema.parse(row, {
    error: () => `Failed to fetch the user ${login}`,
  });
};
