import "server-only";
import type {
  PublicUser,
  SessionUser,
  TableUser,
} from "@/features/users/shared";
import type { RoleId, SessionId, User, UserId } from "../schemas";

import {
  publicUserSchema,
  sessionUserSchema,
  tableUserSchema,
} from "@/features/users/shared";
import { db } from "../db";
import { userSchema } from "../schemas";

const statements = {
  insert: db.prepare(`
    INSERT INTO users (
      id, 
      login, 
      password, 
      salt, 
      role_id, 
      registered_at, 
      updated_at
    ) VALUES (
      @userId, 
      @login, 
      @password, 
      @salt, 
      @roleId, 
      @registeredAt, 
      @updatedAt
    ) RETURNING 
      id AS userId, 
      login, 
      password, 
      salt, 
      role_id AS roleId, 
      registered_at AS registeredAt, 
      updated_at AS updatedAt;
  `),
  selectSessionUser: db.prepare(`
    SELECT
      users.id AS userId,
      users.login,
      users.role_id AS roleId
    FROM sessions
    INNER JOIN users ON sessions.user_id = users.id
    WHERE sessions.id = @sessionId
    AND sessions.expires_at > @now;
  `),
  selectAuthUser: db.prepare(`
    SELECT 
      id AS userId, 
      login, 
      password, 
      salt, 
      role_id AS roleId, 
      registered_at AS registeredAt, 
      updated_at AS updatedAt
    FROM users
    WHERE login = @login;
  `),
  selectPublicUser: db.prepare(`SELECT login FROM users WHERE id = @userId`),
  selectAllUsers: db.prepare(`
    SELECT 
      id AS userId, 
      login, 
      role_id AS roleId, 
      registered_at AS registeredAt, 
      updated_at AS updatedAt
    FROM users;
  `),
  updateRole: db.prepare(`
    UPDATE users
    SET role_id = @roleId
    WHERE id = @userId;
  `),
  delete: db.prepare(`DELETE FROM users WHERE id = @userId;`),
};

export const insertUser = db.transaction((user: User): UserId => {
  const row = statements.insert.get(user);
  if (!row) throw new Error("Unable to create an account");

  return userSchema.parse(row).userId;
});

export const selectUserByLogin = (login: string): User => {
  const row = statements.selectAuthUser.get({ login });
  if (!row) throw new Error("User not found");

  return userSchema.parse(row);
};

export const selectUserBySession = (sessionId: SessionId): SessionUser => {
  const row = statements.selectSessionUser.get({ sessionId, now: Date.now() });
  if (!row) throw new Error(`Session not found. Session: ${sessionId}`);

  return sessionUserSchema.parse(row);
};

export const selectPublicUserById = (userId: UserId): PublicUser => {
  const row = statements.selectPublicUser.get({ userId });
  if (!row) throw new Error(`User not found. Id: ${userId}`);

  return publicUserSchema.parse(row);
};

export const selectUsers = (): TableUser[] => {
  const rows = statements.selectAllUsers.all();
  if (!rows.length) throw new Error("No users are registered");

  return tableUserSchema.parse(rows);
};

export const updateRole = (userId: UserId, roleId: RoleId): void => {
  const { changes } = statements.updateRole.run({ userId, roleId });
  if (!changes) throw new Error("Couldn't save the role change in the table");
};

export const deleteUser = (userId: UserId): void => {
  const { changes } = statements.delete.run({ userId });
  if (!changes) throw new Error("Couldn't delete the user in the table");
};
