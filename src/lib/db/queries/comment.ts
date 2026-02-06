import "server-only";
import type { InputComment } from "@/features/comment/shared";
import type { Comment, CommentId, PostSlug, UserId } from "../schemas";

import { db } from "../db";
import { commentsSchema } from "../schemas";

const statements = {
  insertComment: db.prepare(`
    INSERT INTO comments (
      id,
      content,
      commented_at,
      author_id,
      post_id
    ) VALUES (
      @commentId,
      @content,
      @commentedAt,
      @authorId,
      @postSlug 
    );
  `),
  selectComments: db.prepare(`
    SELECT 
      id AS commentId,
      content,
      commented_at AS commentedAt, 
      author_id AS authorId, 
      post_id AS postSlug
    FROM comments
    WHERE post_id = @postSlug
    ORDER BY commented_at DESC;
  `),
  deleteAnyComment: db.prepare(`
    DELETE FROM comments WHERE id = @commentId;
  `),
  deleteSelfComment: db.prepare(`
    DELETE FROM comments WHERE id = @commentId AND author_id = @authorId;
  `),
};

export const insertComment = (comment: InputComment): void => {
  const { changes } = statements.insertComment.run(comment);
  if (!changes) throw new Error("Couldn't send the comment");
};

export const selectComments = (postSlug: PostSlug): Comment[] => {
  const rows = statements.selectComments.all({ postSlug });
  return commentsSchema.parse(rows);
};

export const deleteAnyComment = (commentId: CommentId): void => {
  const { changes } = statements.deleteAnyComment.run({ commentId });
  if (!changes) throw new Error("Couldn't delete the comment: Not Found");
};

export const deleteSelfComment = (
  commentId: CommentId,
  authorId: UserId,
): void => {
  const { changes } = statements.deleteSelfComment.run({ commentId, authorId });
  if (!changes) throw new Error("Couldn't delete the comment");
};
