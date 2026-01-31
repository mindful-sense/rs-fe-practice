import "server-only";

import type { InputComment } from "@/features/post/shared";
import type { Comment, Post, PostSlug } from "../schemas";

import { db } from "../db";
import { commentsSchema, postSchema, postsSchema } from "../schemas";

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
    WHERE post_id = @postSlug;
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
};

export const insertComment = (comment: InputComment): void => {
  const { changes } = statements.insertComment.run(comment);
  if (!changes) throw new Error("Couldn't send the comment");
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
