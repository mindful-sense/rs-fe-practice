import "server-only";
import { type UserId } from "@/lib/shared";
import { db } from "../db";

const insertSessionStmt = db.prepare(`
  INSERT INTO sessions(id, user_id, expires_at)
  VALUES (@sessionId, @userId, @expiresAt)
`);

export const insertSession = (session: {
  sessionId: string;
  userId: UserId;
  expiresAt: number;
}): void => {
  insertSessionStmt.run(session);
};
