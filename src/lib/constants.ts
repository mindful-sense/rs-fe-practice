export const ROLES = {
  ADMIN: 0,
  MODERATOR: 1,
  READER: 2,
  GUEST: 3,
} as const satisfies Record<string, number>;

export const ROLE_NAMES = ["Admin", "Moderator", "Reader", "Guest"] as const;
export type RoleName = (typeof ROLE_NAMES)[number];

export const ROUTE_PATHS = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  USERS: "/users",
  POST: "/post",
} as const satisfies Record<string, `/${string}`>;

export type RoutePath = (typeof ROUTE_PATHS)[keyof typeof ROUTE_PATHS];

export type AuthRoutePath =
  | typeof ROUTE_PATHS.LOGIN
  | typeof ROUTE_PATHS.REGISTER;

export const isAuthRoutePath = (value: unknown): value is Element =>
  [ROUTE_PATHS.LOGIN, ROUTE_PATHS.REGISTER].includes(value as AuthRoutePath);

export const AUTH_CONFIG = {
  ENCODING: "hex" satisfies BufferEncoding,
  PASSWORD_BYTES: 64,
  SALT_BYTES: 16,
  SESSION_BYTES: 32,
  SESSION_COOKIE_NAME: "session-key",
  SESSION_EXPIRE_MS: 60 * 60 * 24 * 7 * 1000,
} as const;
