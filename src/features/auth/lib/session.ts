import "server-only";

import type { SafeUser, UserId } from "@/lib/shared";

import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { cache } from "react";

import {
  deleteSession,
  getErrorMessage,
  getSafeUser,
  insertSession,
  updateSession,
} from "@/lib/server";
import { AUTH_CONFIG } from "./config";

const getFutureWeekInMs = (): number =>
  Date.now() + AUTH_CONFIG.SESSION_EXPIRE_MS;

const setCookie = async (
  sessionId: string,
  expiresAt: number = getFutureWeekInMs(),
): Promise<void> => {
  (await cookies()).set(AUTH_CONFIG.SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
};

export const createSession = async (userId: UserId): Promise<void> => {
  try {
    const sessionId = randomBytes(AUTH_CONFIG.SESSION_BYTES).toString(
      AUTH_CONFIG.ENCODING,
    );
    const expiresAt = getFutureWeekInMs();

    insertSession({ sessionId, userId, expiresAt });
    await setCookie(sessionId, expiresAt);
  } catch (error) {
    console.error(getErrorMessage(error));
    throw new Error("A problem has occured. Try again");
  }
};

export const deleteUserFromSession = async (): Promise<void> => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(AUTH_CONFIG.SESSION_COOKIE_NAME)?.value;
  if (!sessionId) return;

  try {
    deleteSession(sessionId);
    cookieStore.delete(AUTH_CONFIG.SESSION_COOKIE_NAME);
  } catch (error) {
    console.error(
      `Couldn't delete the session ${sessionId} from DB: ${getErrorMessage(error)}`,
    );
  }
};

export const refreshSession = async (): Promise<void> => {
  const sessionId = (await cookies()).get(
    AUTH_CONFIG.SESSION_COOKIE_NAME,
  )?.value;
  if (!sessionId) return;

  try {
    const expiresAt = getFutureWeekInMs();

    updateSession({ sessionId, expiresAt });
    await setCookie(sessionId, expiresAt);
  } catch (error) {
    console.error(
      `Couldn't update the session ${sessionId}: ${getErrorMessage(error)}`,
    );
  }
};

export const getCurrentUser = cache(async (): Promise<SafeUser | null> => {
  const sessionId = (await cookies()).get(
    AUTH_CONFIG.SESSION_COOKIE_NAME,
  )?.value;
  return sessionId ? await getSafeUser(sessionId) : null;
});
