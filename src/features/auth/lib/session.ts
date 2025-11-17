import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { type JWTPayload, jwtVerify, SignJWT } from "jose";
import { type User } from "@/lib/shared";
import { getEnvVar } from "@/lib/server";

interface SessionPayload extends User, JWTPayload {
  expiresAt: Date;
}

const SESSION_ALGORITHM = "HS256";
const SESSION_COOKIE_NAME = "session";
const SESSION_DURATION = "7d";
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  path: "/",
} as const;

const getWeekDate = (): Date => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

const getSessionKey = cache(() =>
  new TextEncoder().encode(getEnvVar("SESSION_SECRET")),
);

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

export const createSession = async (user: User): Promise<void> => {
  const expiresAt = getWeekDate();
  const session = await encrypt({ ...user, expiresAt });

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

  return {
    user: { ...session },
    isAuthorized: true,
  };
});

export const readSession = cache(async () => {
  const cookie = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    return null;
  }

  return {
    user: { ...session },
    isAuthorized: true,
  };
});
