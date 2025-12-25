import "server-only";
import { randomBytes, scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { CONFIG } from "./config";

const scryptAsync = promisify(scrypt);

export const hashPassword = async (
  password: string,
  salt: string,
): Promise<string> => {
  const hash = (await scryptAsync(
    password.normalize(),
    salt,
    CONFIG.PASSWORD_BYTES,
  )) as Buffer;

  return hash.toString(CONFIG.ENCODING);
};

export const generateSalt = (): string =>
  randomBytes(CONFIG.SALT_BYTES).toString(CONFIG.ENCODING);

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
    Buffer.from(inputHashedPassword, CONFIG.ENCODING),
    Buffer.from(hashedPassword, CONFIG.ENCODING),
  );
};
