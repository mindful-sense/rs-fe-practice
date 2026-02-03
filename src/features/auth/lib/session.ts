import "server-only";
import type { SessionUser, UserId } from "@/lib/shared";

import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { cache } from "react";

import {
  deleteExpiredSessions,
  deleteSession,
  getErrorMessage,
  insertSession,
  selectUserBySession,
  updateSession,
} from "@/lib/server";
import { AUTH_CONFIG } from "@/lib/shared";

const getNewExpiration = (): number =>
  Date.now() + AUTH_CONFIG.SESSION_EXPIRE_MS;

const setCookie = async (
  sessionId: string,
  expiresAt: number = getNewExpiration(),
): Promise<void> => {
  (await cookies()).set(AUTH_CONFIG.SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
};

const deleteCookie = async (): Promise<void> => {
  (await cookies()).delete(AUTH_CONFIG.SESSION_COOKIE_NAME);
};

export const createSession = async (userId: UserId): Promise<void> => {
  try {
    deleteExpiredSessions();
  } catch (error) {
    console.error(
      `Couldn't delete expired session from DB: ${getErrorMessage(error)}`,
    );
  }

  try {
    const sessionId = randomBytes(AUTH_CONFIG.SESSION_BYTES).toString(
      AUTH_CONFIG.ENCODING,
    );
    const expiresAt = getNewExpiration();

    insertSession({ sessionId, userId, expiresAt });
    await setCookie(sessionId, expiresAt);
  } catch (error) {
    console.error(`Couldn't create a session: ${getErrorMessage(error)}`);
    throw new Error("A problem has occured. Try again");
  }
};

export const deleteUserFromSession = async (): Promise<void> => {
  const sessionId = (await cookies()).get(
    AUTH_CONFIG.SESSION_COOKIE_NAME,
  )?.value;
  if (!sessionId) return;

  try {
    deleteSession(sessionId);
  } catch (error) {
    console.error(
      `Couldn't delete the session ${sessionId} from DB: ${getErrorMessage(error)}`,
    );
  } finally {
    await deleteCookie();
  }
};

export const refreshSession = async (): Promise<void> => {
  const sessionId = (await cookies()).get(
    AUTH_CONFIG.SESSION_COOKIE_NAME,
  )?.value;
  if (!sessionId) return;

  try {
    const expiresAt = getNewExpiration();

    updateSession({ sessionId, expiresAt });
    await setCookie(sessionId, expiresAt);
  } catch (error) {
    console.error(
      `Couldn't update the session ${sessionId}: ${getErrorMessage(error)}`,
    );
    await deleteCookie();
  }
};

export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const sessionId = (await cookies()).get(
    AUTH_CONFIG.SESSION_COOKIE_NAME,
  )?.value;
  if (!sessionId) return null;

  try {
    return selectUserBySession(sessionId);
  } catch (error) {
    console.error(`Couldn't get the current user: ${getErrorMessage(error)}`);
    return null;
  }
});
