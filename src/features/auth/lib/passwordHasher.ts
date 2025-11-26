import "server-only";
import crypto from "crypto";

const BYTES_NUMBER = 16;
const HEX_ENCODING = "hex" satisfies BufferEncoding;
const KEY_LENGTH = 64;

export const hashPassword = (password: string, salt: string): Promise<string> =>
  new Promise((resolve, reject) => {
    crypto.scrypt(password.normalize(), salt, KEY_LENGTH, (error, hash) => {
      if (error) reject(error);
      resolve(hash.toString(HEX_ENCODING).normalize());
    });
  });

export const generateSalt = (): string =>
  crypto.randomBytes(BYTES_NUMBER).toString(HEX_ENCODING).normalize();
