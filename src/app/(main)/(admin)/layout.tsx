import { redirect } from "next/navigation";
import { type ReactNode } from "react";
import { getCurrentUser } from "@/features/auth/server";
import { ROLES, ROUTE_PATHS } from "@/lib/constants";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect(ROUTE_PATHS.LOGIN);
  if (user.roleId !== ROLES.ADMIN) redirect(ROUTE_PATHS.HOME);

  return children;
}
