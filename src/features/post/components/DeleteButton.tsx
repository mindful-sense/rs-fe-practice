"use client";

import { useFormStatus } from "react-dom";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { type ChipVariantProps, ChipButton } from "@/components/ui";

export function DeleteButton({ size, border, rounded }: ChipVariantProps) {
  const { pending } = useFormStatus();

  return (
    <ChipButton
      type="submit"
      size={size}
      border={border}
      rounded={rounded}
      color="danger"
      icon={faTrash}
      disabled={pending}
    />
  );
}
