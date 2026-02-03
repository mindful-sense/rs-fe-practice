import "server-only";
import type { Comment, Post, PostSlug } from "../schemas";

import { db } from "../db";
import { postSchema, postsSchema } from "../schemas";
import { selectComments } from "./comment";

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
  deletePost: db.prepare("DELETE FROM posts WHERE id = @postSlug;"),
};

export interface BlogPost {
  post: Post;
  comments: Comment[];
}

export const selectPost = (slug: PostSlug): BlogPost => {
  const postRow = statements.selectPost.get({ slug });
  if (!postRow) throw new Error("Post not found");

  const post = postSchema.parse(postRow);
  const comments = selectComments(post.postSlug);

  return { post, comments };
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
