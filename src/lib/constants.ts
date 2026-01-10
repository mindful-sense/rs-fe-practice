export const ROLES = {
  ADMIN: 0,
  MODERATOR: 1,
  READER: 2,
  GUEST: 3,
} as const satisfies Record<string, number>;

export const ROLE_NAMES = ["Admin", "Moderator", "Reader", "Guest"] as const;

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
