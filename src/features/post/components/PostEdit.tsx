import type { RoleId } from "@/lib/shared";

import { faFilePen } from "@fortawesome/free-solid-svg-icons";

import { ChipButton } from "@/components/ui";
import { ROLES } from "@/lib/shared";

interface Props {
  roleId?: RoleId;
}

export function PostEdit({ roleId }: Props) {
  const isModerator = roleId === ROLES.MODERATOR || roleId === ROLES.ADMIN;
  if (!isModerator) return null;

  return (
    <>
      <ChipButton icon={faFilePen} iconstyles="-mr-0.5" />
    </>
  );
}
