"use client";

import type { ChipVariantProps } from "@/components/ui";

import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { ChipButton } from "@/components/ui";
import { DeleteComment } from "@/features/comment/shared";
import { MODAL_VIEW } from "@/features/modal/shared";
import { DeletePost } from "@/features/post/shared";
import { openModal, useAppDispatch } from "@/lib/client";

type DeletePayload =
  | { view: typeof MODAL_VIEW.DELETE_COMMENT; data: DeleteComment }
  | { view: typeof MODAL_VIEW.DELETE_POST; data: DeletePost };

interface Props extends ChipVariantProps {
  payload: DeletePayload;
}

export function DeleteButton({ size, border, rounded, payload }: Props) {
  const dispatch = useAppDispatch();

  return (
    <ChipButton
      type="submit"
      size={size}
      border={border}
      rounded={rounded}
      color="danger"
      icon={faTrash}
      onClick={() => dispatch(openModal(payload))}
    />
  );
}
