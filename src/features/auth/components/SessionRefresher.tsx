"use client";

import { useEffect } from "react";
import { refreshSessionAction } from "../lib/actions";

export function SessionRefresher() {
  useEffect(() => {
    refreshSessionAction();
  }, []);

  return null;
}
