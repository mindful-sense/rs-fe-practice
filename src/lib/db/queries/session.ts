import "server-only";

import type { Session, UpdateSession } from "../schema";

import { db } from "../db";
import { sessionSchema, updateSessionSchema } from "../schema";

const statements = {
  insert: db.prepare(`
    INSERT INTO sessions (id, user_id, expires_at)
    VALUES (@sessionId, @userId, @expiresAt);
  `),
  update: db.prepare(`
    UPDATE sessions
    SET expires_at = @expiresAt
    WHERE id = @sessionId;
  `),
  delete: db.prepare(`DELETE FROM sessions WHERE id = @sessionId;`),
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
