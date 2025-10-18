import "server-only";

import { type JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

import { getWeekDate } from "@/utils";

interface CookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "lax" | "strict" | "none";
  path: string;
  expires: Date;
}

interface SessionPayload extends JWTPayload {
  userId: string;
  expiresAt: Date;
}

const COOKIE_OPTIONS: Omit<CookieOptions, "expires"> = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  path: "/",
};

const SESSION_ALGORITHM = "HS256";
const SESSION_COOKIE_NAME = "session";
const SESSION_DURATION = "7d";

const getSessionKey = cache(() => {
  const secretKey = process.env.SESSION_SECRET;

  if (!secretKey) {
    throw new Error("SESSION_SECRET variable is not set");
  }

  return new TextEncoder().encode(secretKey);
});

const encrypt = async (payload: SessionPayload): Promise<string> =>
  new SignJWT(payload)
    .setProtectedHeader({ alg: SESSION_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(getSessionKey());

const decrypt = async (session?: string): Promise<SessionPayload | null> => {
  if (!session) {
    return null;
  }

  const { payload } = await jwtVerify<SessionPayload>(
    session,
    getSessionKey(),
    {
      algorithms: [SESSION_ALGORITHM],
    },
  );

  return payload;
};

export const createSession = async (userId: string): Promise<void> => {
  const expiresAt = getWeekDate();
  const session = await encrypt({ userId, expiresAt });

  (await cookies()).set(SESSION_COOKIE_NAME, session, {
    ...COOKIE_OPTIONS,
    expires: expiresAt,
  });
};

export const updateSession = async (): Promise<void> => {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return;
  }

  cookieStore.set(SESSION_COOKIE_NAME, session, {
    ...COOKIE_OPTIONS,
    expires: getWeekDate(),
  });
};

export const deleteSession = async (): Promise<void> => {
  (await cookies()).delete(SESSION_COOKIE_NAME);
};

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/login");
  }

  return { isAuthorized: true, userId: session.userId };
});
