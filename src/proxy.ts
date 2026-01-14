import { type NextRequest, NextResponse } from "next/server";
import { AUTH_CONFIG, isAuthRoutePath, ROUTE_PATHS } from "@/lib/shared";

export function proxy(request: NextRequest) {
  const session = request.cookies.get(AUTH_CONFIG.SESSION_COOKIE_NAME);
  const isAuthPage = isAuthRoutePath(request.nextUrl.pathname);

  if (isAuthPage && session) {
    return NextResponse.redirect(new URL(ROUTE_PATHS.HOME, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register"],
};
