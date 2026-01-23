import "server-only";

import type { Post, PostSlug } from "../schemas";

import { db } from "../db";
import { postSchema, postsSchema } from "../schemas";

const statements = {
  selectPost: db.prepare(`
    SELECT id, title, lead, json(content) AS content, conclusion, published_at, image_preview, image_lead
    FROM posts
    WHERE id = @slug;
  `),
  selectAll: db.prepare(`
    SELECT id, title, lead, json(content) AS content, conclusion, published_at, image_preview, image_lead
    FROM posts;
  `),
};

export const selectPostBySlug = (slug: PostSlug): Post => {
  const row = statements.selectPost.get({ slug });
  if (!row) throw new Error("Post is not found");

  // return postSchema.parse(row, {
  //   error: () => `Failed to fetch post ${slug}`,
  // });
  return postSchema.parse(row);
};

export const selectPosts = (): Post[] => {
  const rows = statements.selectAll.all();
  if (!rows.length) throw new Error("No posts are made");

  return postsSchema.parse(rows, {
    error: () => "Failed to fetch posts",
  });
};
