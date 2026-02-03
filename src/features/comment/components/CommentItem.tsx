import type { Comment, RoleId, UserId } from "@/lib/shared";

import { DeleteButton } from "@/components/core";
import { Paragraph } from "@/components/ui";
import { MODAL_VIEW } from "@/features/modal/shared";
import { ROLES, getPassedTime } from "@/lib/shared";

import { CommentAuthor } from "./CommentAuthor";

interface Props {
  comment: Comment;
  currentUserId?: UserId;
  roleId?: RoleId;
}

export function CommentItem({ comment, currentUserId, roleId }: Props) {
  const { commentId, content, commentedAt, authorId, postSlug } = comment;
  const isAuthor = currentUserId === authorId;
  const isModerator = roleId === ROLES.MODERATOR || roleId === ROLES.ADMIN;

  return (
    <li className="bg-elembg relative flex flex-col gap-2 rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CommentAuthor authorId={authorId} />
          <span className="h-1 w-1 rounded-full bg-neutral-300" />
          <time dateTime={commentedAt} className="text-sm text-neutral-300">
            {getPassedTime(Date.parse(commentedAt))}
          </time>
        </div>

        {(isAuthor || isModerator) && (
          <DeleteButton
            size="md"
            border="none"
            rounded="semi"
            payload={{
              view: MODAL_VIEW.DELETE_COMMENT,
              data: { commentId, postSlug },
            }}
          />
        )}
      </div>

      <Paragraph text={content} />
    </li>
  );
}
