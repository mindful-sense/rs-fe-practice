export const CONFIG = {
  ENCODING: "hex" satisfies BufferEncoding,
  PASSWORD_BYTES: 64,
  SALT_BYTES: 16,
  SESSION_BYTES: 32,
  SESSION_COOKIE_NAME: "session-key",
  SESSION_EXPIRE_MS: 60 * 60 * 24 * 7 * 1000,
} as const;
