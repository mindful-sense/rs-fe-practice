import "server-only";

import type { UserId, SafeUser } from "@/lib/shared";

import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { cache } from "react";

import { deleteSession, getSafeUser, insertSession } from "@/lib/server";
import { CONFIG } from "./config";

const getFutureWeekInMs = (): number => Date.now() + CONFIG.SESSION_EXPIRE_MS;

const setCookie = async (
  sessionId: string,
  expiresAt: number = getFutureWeekInMs(),
): Promise<void> => {
  (await cookies()).set(CONFIG.SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
};

export const createSession = async (userId: UserId): Promise<void> => {
  const sessionId = randomBytes(CONFIG.SESSION_BYTES).toString(CONFIG.ENCODING);
  const expiresAt = getFutureWeekInMs();

  insertSession({ sessionId, userId, expiresAt });
  await setCookie(sessionId, expiresAt);
};

export const deleteUserFromSession = async (): Promise<void> => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(CONFIG.SESSION_COOKIE_NAME)?.value;

  if (!sessionId) return;

  deleteSession(sessionId);
  cookieStore.delete(CONFIG.SESSION_COOKIE_NAME);
};

export const getUserFromSession = async (): Promise<SafeUser | null> => {
  const sessionId = (await cookies()).get(CONFIG.SESSION_COOKIE_NAME)?.value;
  return sessionId ? await getSafeUser(sessionId) : null;
};

export const getCurrentUser = cache(async () => await getUserFromSession());
