import "server-only";

import type { InputComment } from "@/features/post/shared";
import type { Comment, CommentId, Post, PostSlug, UserId } from "../schemas";

import { db } from "../db";
import { commentsSchema, postSchema, postsSchema } from "../schemas";

const statements = {
  selectPost: db.prepare(`
    SELECT 
      id AS postSlug, 
      h1, 
      lead, 
      json(content) AS content, 
      conclusion, 
      published_at AS publishedAt, 
      image_preview AS imagePreview, 
      image_lead AS imageLead
    FROM posts
    WHERE posts.id = @slug;
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
  selectAll: db.prepare(`
    SELECT 
      id AS postSlug, 
      h1, 
      lead, 
      json(content) AS content, 
      conclusion, 
      published_at AS publishedAt, 
      image_preview AS imagePreview, 
      image_lead AS imageLead
    FROM posts;
  `),
  deletePost: db.prepare(`
    DELETE FROM posts WHERE id = @postSlug;  
  `),
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
  deleteSelfComment: db.prepare(`
    DELETE FROM comments WHERE id = @commentId AND author_id = @authorId;
  `),
  deleteAnyComment: db.prepare(`
    DELETE FROM comments WHERE id = @commentId;
  `),
};

export interface BlogPost {
  post: Post;
  comments: Comment[];
}

export const selectPostBySlug = (slug: PostSlug): BlogPost => {
  const postRow = statements.selectPost.get({ slug });
  if (!postRow) throw new Error("Post not found");

  const post = postSchema.parse(postRow);
  const commentRows = statements.selectComments.all({
    postSlug: post.postSlug,
  });

  return { post, comments: commentsSchema.parse(commentRows) };
};

export const selectPosts = (): Post[] => {
  const rows = statements.selectAll.all();
  if (!rows.length) throw new Error("No posts are made");

  return postsSchema.parse(rows);
};

export const deletePost = (postSlug: PostSlug): void => {
  const { changes } = statements.deletePost.run({ postSlug });
  if (!changes) throw new Error("Couldn't delete the post");
};

export const insertComment = (comment: InputComment): void => {
  const { changes } = statements.insertComment.run(comment);
  if (!changes) throw new Error("Couldn't send the comment");
};

export const deleteSelfComment = (
  commentId: CommentId,
  authorId: UserId,
): void => {
  console.log("deleteSelfComment", commentId, authorId);
  const { changes } = statements.deleteSelfComment.run({ commentId, authorId });
  if (!changes) throw new Error("Couldn't delete the comment");
};

export const deleteAnyComment = (commentId: CommentId): void => {
  const { changes } = statements.deleteAnyComment.run({ commentId });
  if (!changes) throw new Error("Couldn't delete the comment: Not Found");
};
