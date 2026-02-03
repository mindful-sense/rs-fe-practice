import type { PostSlug, RoleId } from "@/lib/shared";

import { faFilePen } from "@fortawesome/free-solid-svg-icons";

import { DeleteButton } from "@/components/core";
import { ChipButton } from "@/components/ui";
import { MODAL_VIEW } from "@/features/modal/shared";
import { ROLES } from "@/lib/shared";

interface Props {
  postSlug: PostSlug;
  roleId?: RoleId;
}

export function PostActions({ postSlug, roleId }: Props) {
  const isModerator = roleId !== ROLES.MODERATOR && roleId !== ROLES.ADMIN;

  if (isModerator) return null;

  return (
    <>
      <ChipButton icon={faFilePen} iconstyles="-mr-0.5" />
      <DeleteButton
        payload={{ view: MODAL_VIEW.DELETE_POST, data: { postSlug } }}
      />
    </>
  );
}
