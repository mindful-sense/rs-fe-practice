import "server-only";

import type { User, UserId } from "../schema";

import { randomUUID } from "crypto";

import { ROLES } from "@/lib/constants";
import { getTimestampWithoutTime } from "@/lib/utils.shared";

import { db } from "../db";
import { userSchema } from "../schema";

const statements = {
  insertUser: db.prepare(`
    INSERT INTO users(id, login, password, salt, role_id, registered_at, updated_at)
    VALUES (@userId, @login, @password, @salt, @roleId, @registeredAt, @updatedAt)
    RETURNING id, login, password, salt, role_id, registered_at, updated_at
  `),
  getUser: db.prepare(`
    SELECT id, login, password, salt, role_id, registered_at, updated_at
    FROM users
    WHERE login = @login
    LIMIT 1
  `),
};

export const insertUser = db.transaction(
  (user: Pick<User, "login" | "password" | "salt">): UserId => {
    const userId = randomUUID();
    const registeredAt = getTimestampWithoutTime(new Date());
    const row = statements.insertUser.get({
      ...user,
      userId,
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

export const getUserByLogin = (login: string): User => {
  const row = statements.getUser.get({ login });
  if (!row) throw new Error("User is not found");

  return userSchema.parse(row, {
    error: () => `Failed to fetch the user ${login}`,
  });
};
