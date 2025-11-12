"use client";

import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { isAuthRoutePath } from "@/config";

export function NavButtons({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (isAuthRoutePath(pathname)) {
    return null;
  }

  return (
    <nav className="-mr-2">
      <ul className="flex items-center gap-4">{children}</ul>
    </nav>
  );
}
