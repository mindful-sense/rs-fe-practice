import "server-only";
import { randomBytes, scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { AUTH_CONFIG } from "@/lib/shared";

const scryptAsync = promisify(scrypt);

export const hashPassword = async (
  password: string,
  salt: string,
): Promise<string> => {
  const hash = (await scryptAsync(
    password.normalize(),
    salt,
    AUTH_CONFIG.PASSWORD_BYTES,
  )) as Buffer;

  return hash.toString(AUTH_CONFIG.ENCODING);
};

export const generateSalt = (): string =>
  randomBytes(AUTH_CONFIG.SALT_BYTES).toString(AUTH_CONFIG.ENCODING);

export const comparePasswords = async ({
  hashedPassword,
  password,
  salt,
}: {
  hashedPassword: string;
  password: string;
  salt: string;
}): Promise<boolean> => {
  const inputHashedPassword = await hashPassword(password, salt);

  return timingSafeEqual(
    Buffer.from(inputHashedPassword, AUTH_CONFIG.ENCODING),
    Buffer.from(hashedPassword, AUTH_CONFIG.ENCODING),
  );
};
