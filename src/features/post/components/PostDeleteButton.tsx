import type { PostSlug, RoleId } from "@/lib/shared";

import { DeleteButton } from "@/components/core";
import { MODAL_VIEW } from "@/features/modal/shared";
import { ROLES } from "@/lib/shared";

interface Props {
  postSlug: PostSlug;
  roleId?: RoleId;
}

export function PostDeleteButton({ postSlug, roleId }: Props) {
  if (roleId !== ROLES.ADMIN) return null;

  return (
    <>
      <DeleteButton
        payload={{ view: MODAL_VIEW.DELETE_POST, data: { postSlug } }}
      />
    </>
  );
}
