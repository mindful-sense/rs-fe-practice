export const ROLES = {
  ADMIN: 1,
  MODERATOR: 2,
  READER: 3,
  GUEST: 4,
} as const satisfies Record<string, number>;

export const ROUTE_PATHS = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  USERS: "/users",
  POST: "/post",
} as const satisfies Record<string, `/${string}`>;

export type Role = (typeof ROLES)[keyof typeof ROLES];
export type RoutePath = (typeof ROUTE_PATHS)[keyof typeof ROUTE_PATHS];
export type AuthRoutePath =
  | typeof ROUTE_PATHS.LOGIN
  | typeof ROUTE_PATHS.REGISTER;

const createTypeGuard =
  <Element extends string | number>(obj: Record<string, Element>) =>
  (value: unknown): value is Element =>
    Object.values(obj).includes(value as Element);

export const isRole = createTypeGuard(ROLES);
export const isRoutePath = createTypeGuard(ROUTE_PATHS);
export const isAuthRoutePath = createTypeGuard({
  LOGIN: ROUTE_PATHS.LOGIN,
  REGISTER: ROUTE_PATHS.REGISTER,
});
