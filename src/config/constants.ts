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
} as const satisfies Record<string, `/${string}`>;

export type Role = (typeof ROLES)[keyof typeof ROLES];
export type RoutePath = (typeof ROUTE_PATHS)[keyof typeof ROUTE_PATHS];
export type AuthRoutePath =
  | typeof ROUTE_PATHS.LOGIN
  | typeof ROUTE_PATHS.REGISTER;

const makeTypeGuard = <const Tuple extends readonly (string | number)[]>(
  values: Tuple,
) => {
  type Element = Tuple[number];
  const set = new Set(values);

  return (value: unknown): value is Element => set.has(value as Element);
};

export const isRole = makeTypeGuard(Object.values(ROLES));
export const isRoutePath = makeTypeGuard(Object.values(ROUTE_PATHS));
export const isAuthRoutePath = makeTypeGuard([
  ROUTE_PATHS.LOGIN,
  ROUTE_PATHS.REGISTER,
]);
