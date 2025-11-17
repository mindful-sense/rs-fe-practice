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

const createTypeGuard = <const Tuple extends readonly (string | number)[]>(
  values: Tuple,
) => {
  type Element = Tuple[number];
  const set = new Set(values as readonly Element[]);

  return (value: unknown): value is Element => set.has(value as Element);
};

export const isRole = createTypeGuard(Object.values(ROLES) as readonly Role[]);
export const isRoutePath = createTypeGuard(
  Object.values(ROUTE_PATHS) as readonly RoutePath[],
);
export const isAuthRoutePath = createTypeGuard([
  ROUTE_PATHS.LOGIN,
  ROUTE_PATHS.REGISTER,
] as readonly AuthRoutePath[]);
