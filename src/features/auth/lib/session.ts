import "server-only";
import { cookies } from "next/headers";
import { nanoid } from "nanoid";

import { type UserId } from "@/lib/shared";
import { insertSession } from "@/lib/server";

const SESSION = {
  COOKIE_NAME: "session-key",
  EXPIRATION_MS: 60 * 60 * 24 * 7 * 1000,
} as const;

const getFutureWeekInMs = (): number => Date.now() + SESSION.EXPIRATION_MS;

const setCookie = async (sessionId: string, expiresAt?: number) => {
  (await cookies()).set(SESSION.COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: expiresAt ?? getFutureWeekInMs(),
  });
};

export const createSession = async (userId: UserId): Promise<void> => {
  const sessionId = nanoid();
  const expiresAt = getFutureWeekInMs();

  insertSession({ sessionId, userId, expiresAt });
  await setCookie(sessionId, expiresAt);
};

export const deleteSession = async (): Promise<void> => {
  (await cookies()).delete(SESSION.COOKIE_NAME);
};
