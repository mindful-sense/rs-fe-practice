"use client";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { type ChipVariantProps, ChipButton } from "@/components/ui";
import { MODAL_VIEW } from "@/features/modal/shared";
import { openModal, useAppDispatch } from "@/lib/client";
import { DeleteComment, DeletePost } from "../shared";

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
