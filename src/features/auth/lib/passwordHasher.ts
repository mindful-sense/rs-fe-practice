import "server-only";
import { randomBytes, scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";

const CONFIG = {
  SALT_SIZE: 16,
  HASH_SIZE: 64,
  ENCODING: "hex" satisfies BufferEncoding,
} as const;

const scryptAsync = promisify(scrypt);

export const hashPassword = async (
  password: string,
  salt: string,
): Promise<string> => {
  const hash = (await scryptAsync(
    password.normalize(),
    salt,
    CONFIG.HASH_SIZE,
  )) as Buffer;

  return hash.toString(CONFIG.ENCODING).normalize();
};

export const generateSalt = (): string =>
  randomBytes(CONFIG.SALT_SIZE).toString(CONFIG.ENCODING).normalize();

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
