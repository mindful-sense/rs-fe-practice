"use client";

import type { PostSlug, RoleId } from "@/lib/shared";

import { faFilePen, faTrash } from "@fortawesome/free-solid-svg-icons";

import { ChipButton } from "@/components/ui";
import { MODAL_VIEW } from "@/features/modal/shared";
import { openModal, useAppDispatch } from "@/lib/client";
import { ROLES } from "@/lib/shared";

export function PostActions({
  postSlug,
  roleId,
}: {
  postSlug: PostSlug;
  roleId?: RoleId;
}) {
  const dispatch = useAppDispatch();

  if (roleId !== ROLES.MODERATOR && roleId !== ROLES.ADMIN) return null;

  return (
    <>
      <ChipButton icon={faFilePen} iconstyles="-mr-0.5" />
      <ChipButton
        color="danger"
        icon={faTrash}
        onClick={() =>
          dispatch(
            openModal({
              view: MODAL_VIEW.DELETE_POST,
              data: { postSlug },
            }),
          )
        }
      />
    </>
  );
}
