"use client";

import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Back() {
  const router = useRouter();
  const [isBackBtnVisible, setIsBackBtnVisible] = useState(true);

  if (!isBackBtnVisible) return null;

  return (
    <button
      type="button"
      onClick={router.back}
      className="hover:text-accent focus:text-accent flex grow cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white/70 outline-0 backdrop-blur-md transition-colors duration-300"
    >
      <FontAwesomeIcon icon={faCircleLeft} />
      <strong className="text-sm font-medium">Back</strong>
    </button>
  );
}
