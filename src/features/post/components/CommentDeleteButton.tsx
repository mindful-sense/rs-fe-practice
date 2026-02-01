"use client";

import { useFormStatus } from "react-dom";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ChipButton } from "@/components/ui";

export function CommentDeleteButton() {
  const { pending } = useFormStatus();

  return (
    <ChipButton
      type="submit"
      size="md"
      border="none"
      rounded="semi"
      color="danger"
      icon={faTrash}
      disabled={pending}
    />
  );
}
