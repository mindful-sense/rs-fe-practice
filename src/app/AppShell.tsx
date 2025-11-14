"use client";

import { useGetMeQuery } from "@/lib/redux/api";

export function AppShell({ children }: { children: React.ReactNode }) {
  useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  return <>{children}</>;
}
