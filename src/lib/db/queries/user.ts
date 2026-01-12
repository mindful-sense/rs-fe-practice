import "server-only";

import type { SafeUser, SessionId, TableUser, User, UserId } from "../schema";

import { randomUUID } from "crypto";

import { ROLES } from "@/lib/constants";
import { getErrorMessage } from "@/lib/utils.server";
import { getTimestampWithoutTime } from "@/lib/utils.shared";

import { db } from "../db";
import { safeUserSchema, tableUserSchema, userSchema } from "../schema";

const statements = {
  insert: db.prepare(`
    INSERT INTO users(id, login, password, salt, role_id, registered_at, updated_at)
    VALUES (@userId, @login, @password, @salt, @roleId, @registeredAt, @updatedAt)
    RETURNING id, login, password, salt, role_id, registered_at, updated_at;
  `),
  selectOneSafe: db.prepare(`
    SELECT
      users.id,
      users.login,
      users.role_id
    FROM sessions
    INNER JOIN users ON sessions.user_id = users.id
    WHERE sessions.id = @sessionId;
  `),
  selectOne: db.prepare(`
    SELECT id, login, password, salt, role_id, registered_at, updated_at
    FROM users
    WHERE login = @login;
  `),
  selectAll: db.prepare(`
    SELECT id, login, role_id, registered_at, updated_at
    FROM users;
  `),
};

export const insertUser = db.transaction(
  (user: Pick<User, "login" | "password" | "salt">): UserId => {
    const userId = randomUUID();
    const registeredAt = getTimestampWithoutTime(new Date());
    const row = statements.insert.get({
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

export const selectUserByLogin = (login: string): User => {
  const row = statements.selectOne.get({ login });
  if (!row) throw new Error("User is not found");

  return userSchema.parse(row, {
    error: () => `Failed to fetch the user ${login}`,
  });
};

export const selectSafeUser = (sessionId: SessionId): SafeUser | null => {
  try {
    const row = statements.selectOneSafe.get({ sessionId });
    if (!row) throw new Error(`Data is not found. Session: ${sessionId}`);

    return safeUserSchema.parse(row);
  } catch (error) {
    console.error(getErrorMessage(error));
    return null;
  }
};

export const selectUsers = (): { users?: TableUser[]; message?: string } => {
  try {
    const rows = statements.selectAll.all();
    if (!rows.length) throw new Error("No users are registered");

    return {
      users: tableUserSchema.parse(rows, {
        error: () => "Failed to fetch users",
      }),
    };
  } catch (error) {
    return { message: getErrorMessage(error) };
  }
};
