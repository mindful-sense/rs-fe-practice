import "server-only";

import type {
  PublicUser,
  RoleId,
  SessionUser,
  SessionId,
  TableUser,
  User,
  UserId,
} from "../schemas";

import { randomUUID } from "crypto";

import { ROLES } from "@/lib/constants";
import { getTimestampWithoutTime } from "@/lib/utils.shared";

import { db } from "../db";
import {
  publicUserSchema,
  sessionUserSchema,
  tableUserSchema,
  userSchema,
} from "../schemas";

const statements = {
  insert: db.prepare(`
    INSERT INTO users(id, login, password, salt, role_id, registered_at, updated_at)
    VALUES (@userId, @login, @password, @salt, @roleId, @registeredAt, @updatedAt)
    RETURNING id, login, password, salt, role_id, registered_at, updated_at;
  `),
  selectSessionUser: db.prepare(`
    SELECT
      users.id,
      users.login,
      users.role_id
    FROM sessions
    INNER JOIN users ON sessions.user_id = users.id
    WHERE sessions.id = @sessionId
    AND sessions.expires_at > @now;
  `),
  selectAuthUser: db.prepare(`
    SELECT id, login, password, salt, role_id, registered_at, updated_at
    FROM users
    WHERE login = @login;
  `),
  selectPublicUser: db.prepare(`SELECT login FROM users WHERE id = @userId`),
  selectAllUsers: db.prepare(`
    SELECT id, login, role_id, registered_at, updated_at
    FROM users;
  `),
  updateRole: db.prepare(`
    UPDATE users
    SET role_id = @roleId
    WHERE id = @userId;
  `),
  delete: db.prepare(`DELETE FROM users WHERE id = @userId;`),
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
  const row = statements.selectAuthUser.get({ login });
  if (!row) throw new Error("User is not found");

  return userSchema.parse(row, {
    error: () => `Failed to fetch the user ${login}`,
  });
};

export const selectUserBySession = (sessionId: SessionId): SessionUser => {
  const row = statements.selectSessionUser.get({ sessionId, now: Date.now() });
  if (!row) throw new Error(`Data is not found. Session: ${sessionId}`);

  return sessionUserSchema.parse(row);
};

export const selectPublicUserById = (userId: UserId): PublicUser => {
  const row = statements.selectPublicUser.get({ userId });
  if (!row) throw new Error(`Data is not found. Id: ${userId}`);

  return publicUserSchema.parse(row);
};

export const selectUsers = (): TableUser[] => {
  const rows = statements.selectAllUsers.all();
  if (!rows.length) throw new Error("No users are registered");

  return tableUserSchema.parse(rows, {
    error: () => "Failed to fetch users",
  });
};

export const updateRole = (userId: UserId, roleId: RoleId): void => {
  const { changes } = statements.updateRole.run({ userId, roleId });
  if (!changes) throw new Error("Couldn't save the role change in the row");
};

export const deleteUser = (userId: UserId): void => {
  const { changes } = statements.delete.run({ userId });
  if (!changes) throw new Error("Couldn't delete the user in the row");
};
