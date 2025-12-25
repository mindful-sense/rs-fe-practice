import "server-only";

import type { SafeUser, Session } from "@/lib/shared";

import { getErrorMessage } from "@/lib/server";
import { safeUserSchema, sessionSchema } from "@/lib/shared";
import { db } from "../db";

const statements = {
  insertSession: db.prepare(`
    INSERT INTO sessions (id, user_id, expires_at)
    VALUES (@sessionId, @userId, @expiresAt)
  `),
  deleteSession: db.prepare(`DELETE FROM sessions WHERE id = @sessionId`),
  getSafeUser: db.prepare(`
    SELECT
      users.id,
      users.login,
      users.role_id,
      users.registered_at,
      users.updated_at
    FROM sessions
    INNER JOIN users ON sessions.user_id = users.id
    WHERE sessions.id = @sessionId
  `),
};

export const insertSession = (session: Session): void => {
  const parsed = sessionSchema.safeParse(session);
  if (!parsed.success) {
    console.error(getErrorMessage(parsed.error));
    throw new Error(
      "Couldn't sign in automatically. Try to sign in (not sign up, your account is already created)",
    );
  }

  statements.insertSession.run(session);
};

export const deleteSession = (sessionId: string): void => {
  try {
    statements.deleteSession.run({ sessionId });
  } catch (error) {
    console.error(
      `Couldn't delete the session ${sessionId} from DB: ${getErrorMessage(error)}`,
    );
  }
};

export const getSafeUser = async (
  sessionId: string,
): Promise<SafeUser | null> => {
  try {
    const row = statements.getSafeUser.get({ sessionId });
    if (!row) throw new Error(`Data is not found: ${sessionId} | Session ID`);

    return safeUserSchema.parse(row);
  } catch (error) {
    console.error(getErrorMessage(error));
    return null;
  }
};
