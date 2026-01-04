"use client";

import { useEffect } from "react";
import { refreshSessionAction } from "@/features/auth/shared";

export function SessionRefresher() {
  useEffect(() => {
    refreshSessionAction();
  }, []);

  return null;
}
