"use client";

import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { ROUTE_PATHS } from "@/config";

export function Back() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === ROUTE_PATHS.HOME) return null;

  return (
    <button
      type="button"
      onClick={router.back}
      className="hover:text-accent focus:text-accent flex w-23 grow cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white/70 shadow-xs shadow-black/3 outline-0 backdrop-blur-md transition-colors duration-300"
    >
      <FontAwesomeIcon icon={faCircleLeft} />
      <strong className="text-sm font-medium">Back</strong>
    </button>
  );
}
