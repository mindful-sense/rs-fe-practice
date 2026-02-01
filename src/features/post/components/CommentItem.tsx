import type { Comment, RoleId, UserId } from "@/lib/shared";

import { Paragraph } from "@/components/ui";
import { ROLES, getPassedTime } from "@/lib/shared";

import { removeComment } from "../lib/actions";

import { CommentAuthor } from "./CommentAuthor";
import { DeleteButton } from "./DeleteButton";

export function CommentItem({
  comment,
  currentUserId,
  roleId,
}: {
  comment: Comment;
  currentUserId?: UserId;
  roleId?: RoleId;
}) {
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
          <form action={removeComment}>
            <input type="hidden" name="commentId" value={commentId} />
            <input type="hidden" name="postSlug" value={postSlug} />
            <DeleteButton size="md" border="none" rounded="semi" />
          </form>
        )}
      </div>

      <Paragraph text={content} />
    </li>
  );
}
