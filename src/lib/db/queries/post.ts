import "server-only";

import type { Comment, Post, PostSlug } from "../schemas/post";

import { db } from "../db";
import { commentsSchema, postSchema, postsSchema } from "../schemas/post";

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

export interface BlogPost {
  post: Post;
  comments: Comment[];
}

export const selectPostBySlug = (slug: PostSlug): BlogPost => {
  const postRow = statements.selectPost.get({ slug });
  if (!postRow) throw new Error("Post is not found");

  const post = postSchema.parse(postRow, {
    error: () => `Failed to fetch the post ${slug}`,
  });

  const commentRows = statements.selectComments.all({
    postSlug: post.postSlug,
  });

  return { post, comments: commentsSchema.parse(commentRows) };
};

export const selectPosts = (): Post[] => {
  const rows = statements.selectAll.all();
  if (!rows.length) throw new Error("No posts are made");

  return postsSchema.parse(rows, {
    error: () => "Failed to fetch posts",
  });
};
