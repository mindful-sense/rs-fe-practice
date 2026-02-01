import type { PostSlug, RoleId } from "@/lib/shared";

import { faFilePen } from "@fortawesome/free-solid-svg-icons";

import { ChipButton } from "@/components/ui";
import { ROLES } from "@/lib/shared";

import { removePost } from "../lib/actions";
import { DeleteButton } from "./DeleteButton";

export function PostActions({
  postSlug,
  roleId,
}: {
  postSlug: PostSlug;
  roleId?: RoleId;
}) {
  if (roleId !== ROLES.MODERATOR && roleId !== ROLES.ADMIN) return null;

  return (
    <>
      <ChipButton icon={faFilePen} iconstyles="-mr-0.5" />

      <form action={removePost}>
        <input type="hidden" name="postSlug" value={postSlug} />
        <DeleteButton />
      </form>
    </>
  );
}
