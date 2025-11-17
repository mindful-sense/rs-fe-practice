"use client";

import { type PropsWithChildren } from "react";
import { useGetMeQuery } from "@/lib/shared";

export function SessionRefresher({ children }: PropsWithChildren) {
  useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  return children;
}
