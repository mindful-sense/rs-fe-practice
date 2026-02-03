import type { ReactNode } from "react";

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/auth/server";
import { ROLES, ROUTE_PATHS } from "@/lib/shared";

interface Props {
  children: ReactNode;
}

export default async function AdminLayout({ children }: Props) {
  const user = await getCurrentUser();
  if (!user) redirect(ROUTE_PATHS.LOGIN);
  if (user.roleId !== ROLES.ADMIN) redirect(ROUTE_PATHS.HOME);

  return children;
}
