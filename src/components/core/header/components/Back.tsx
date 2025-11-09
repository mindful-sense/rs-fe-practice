"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";

export function Back() {
  const router = useRouter();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(pathname !== "/");
  }, [pathname]);

  if (!isVisible) {
    return null;
  }

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
