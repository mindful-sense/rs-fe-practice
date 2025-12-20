import "server-only";

import type { UserId, UserSession } from "@/lib/shared";

import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import { deleteSession, getUserSessionById, insertSession } from "@/lib/server";

const SESSION = {
  COOKIE_NAME: "session-key",
  EXPIRATION_MS: 60 * 60 * 24 * 7 * 1000,
} as const;

const getFutureWeekInMs = (): number => Date.now() + SESSION.EXPIRATION_MS;

const setCookie = async (
  sessionId: string,
  expiresAt: number = getFutureWeekInMs(),
): Promise<void> => {
  (await cookies()).set(SESSION.COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
};

export const createSession = async (userId: UserId): Promise<void> => {
  const sessionId = nanoid();
  const expiresAt = getFutureWeekInMs();

  insertSession({ sessionId, userId, expiresAt });
  await setCookie(sessionId, expiresAt);
};

export const getUserFromSession = async (): Promise<UserSession | null> => {
  const sessionId = (await cookies()).get(SESSION.COOKIE_NAME)?.value;
  return sessionId ? await getUserSessionById(sessionId) : null;
};

export const deleteUserFromSession = async (): Promise<void> => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION.COOKIE_NAME)?.value;

  if (!sessionId) return;

  deleteSession(sessionId);
  cookieStore.delete(SESSION.COOKIE_NAME);
};
