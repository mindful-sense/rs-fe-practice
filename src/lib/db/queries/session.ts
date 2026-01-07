import "server-only";

import type { SafeUser, Session, SessionId, UpdateSession } from "@/lib/shared";

import { getErrorMessage } from "@/lib/server";
import {
  safeUserSchema,
  sessionSchema,
  updateSessionSchema,
} from "@/lib/shared";
import { db } from "../db";

const statements = {
  insert: db.prepare(`
    INSERT INTO sessions (id, user_id, expires_at)
    VALUES (@sessionId, @userId, @expiresAt)
  `),
  update: db.prepare(`
    UPDATE sessions
    SET expires_at = @expiresAt
    WHERE id = @sessionId
  `),
  delete: db.prepare(`DELETE FROM sessions WHERE id = @sessionId`),
  safeUser: db.prepare(`
    SELECT
      users.id,
      users.login,
      users.role_id
    FROM sessions
    INNER JOIN users ON sessions.user_id = users.id
    WHERE sessions.id = @sessionId
  `),
};

export const insertSession = (session: Session): void => {
  const data = sessionSchema.parse(session);
  const { changes } = statements.insert.run(data);

  if (!changes) throw new Error(`Couldn't insert into the database: ${data}`);
};

export const updateSession = (session: UpdateSession): void => {
  const data = updateSessionSchema.parse(session);
  const { changes } = statements.update.run(data);

  if (!changes) throw new Error("Didn't update the database row");
};

export const deleteSession = (sessionId: string): void => {
  const { changes } = statements.delete.run({ sessionId });
  if (!changes) throw new Error("Didn't delete the database row");
};

export const getSafeUser = async (
  sessionId: SessionId,
): Promise<SafeUser | null> => {
  try {
    const row = statements.safeUser.get({ sessionId });
    if (!row) throw new Error(`Data is not found. Session: ${sessionId}`);

    return safeUserSchema.parse(row);
  } catch (error) {
    console.error(getErrorMessage(error));
    return null;
  }
};
