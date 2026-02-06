import type { PostSlug, RoleId } from "@/lib/shared";

import { faFilePen } from "@fortawesome/free-solid-svg-icons";

import { ChipLinkButton } from "@/components/ui";
import { ROLES } from "@/lib/shared";

interface Props {
  postSlug: PostSlug;
  roleId?: RoleId;
}

export function PostEditButton({ postSlug, roleId }: Props) {
  const isModerator = roleId === ROLES.MODERATOR || roleId === ROLES.ADMIN;
  if (!isModerator) return null;

  return (
    <>
      <ChipLinkButton
        href={`/posts/${postSlug}/edit`}
        icon={faFilePen}
        iconstyles="-mr-1"
      />
    </>
  );
}
