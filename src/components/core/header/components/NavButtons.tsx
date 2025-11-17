"use client";

import { usePathname } from "next/navigation";
import { type PropsWithChildren } from "react";
import { isAuthRoutePath } from "@/config";

export function NavButtons({ children }: PropsWithChildren) {
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
