import "server-only";
import { type UserId, type UserSession, userSessionSchema } from "@/lib/shared";
import { db } from "../db";

const statements = {
  insertSession: db.prepare(`
    INSERT INTO sessions (id, user_id, expires_at)
    VALUES (@sessionId, @userId, @expiresAt)
  `),
  deleteSession: db.prepare(`DELETE FROM sessions WHERE id = @sessionId`),
  getUserSessionById: db.prepare(`
    SELECT
      users.id,
      users.login,
      users.role_id,
      users.registered_at,
      users.updated_at,
      sessions.expires_at
    FROM sessions
    INNER JOIN users ON sessions.user_id = users.id
    WHERE sessions.id = @sessionId
  `),
};

export const insertSession = (session: {
  sessionId: string;
  userId: UserId;
  expiresAt: number;
}): void => {
  statements.insertSession.run(session);
};

export const deleteSession = (sessionId: string): void => {
  statements.deleteSession.run({ sessionId });
};

export const getUserSessionById = async (
  sessionId: string,
): Promise<UserSession | null> => {
  const row = statements.getUserSessionById.get({ sessionId });
  if (!row) return null;

  const { success, data: user } = userSessionSchema.safeParse(row);
  if (!success) return null;

  return user;
};
