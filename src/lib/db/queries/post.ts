import "server-only";
import type { EditPost } from "@/features/post/shared";
import type { Comment, Post, PostSlug } from "../schemas";

import { editPostSchema, postsSchema } from "@/features/post/shared";
import { db } from "../db";
import { postSchema } from "../schemas";
import { selectComments } from "./comment";

const statements = {
  selectPost: db.prepare(`
    SELECT 
      id AS postSlug, 
      h1, 
      lead, 
      content, 
      conclusion, 
      published_at AS publishedAt, 
      image_preview AS imagePreview, 
      image_lead AS imageLead
    FROM posts
    WHERE posts.id = @postSlug;
  `),
  selectEditPost: db.prepare(`
    SELECT 
      id AS postSlug, 
      h1, 
      lead, 
      content, 
      conclusion, 
      image_lead AS imageLead
    FROM posts
    WHERE posts.id = @postSlug;
  `),
  selectAll: db.prepare(`
    SELECT 
      id AS postSlug, 
      h1, 
      lead, 
      content, 
      conclusion, 
      published_at AS publishedAt, 
      image_preview AS imagePreview, 
      image_lead AS imageLead
    FROM posts;
  `),
  updatePost: db.prepare(`
    UPDATE posts
    SET
      id = @newPostSlug,
      h1 = @h1,
      lead = @lead, 
      content = @content, 
      conclusion = @conclusion, 
      image_lead = @imageLead
    WHERE id = @postSlug;
  `),
  deletePost: db.prepare("DELETE FROM posts WHERE id = @postSlug;"),
};

export interface BlogPost {
  post: Post;
  comments: Comment[];
}

export const selectPost = (postSlug: PostSlug): BlogPost => {
  const row = statements.selectPost.get({ postSlug });
  if (!row) throw new Error("Post not found");

  const post = postSchema.parse(row);
  const comments = selectComments(post.postSlug);

  return { post, comments };
};

export const selectEditPost = (postSlug: PostSlug): EditPost => {
  const row = statements.selectEditPost.get({ postSlug });
  if (!row) throw new Error("Post not found");

  return editPostSchema.parse(row);
};

export const selectPosts = (): Post[] => {
  const rows = statements.selectAll.all();
  if (!rows.length) throw new Error("No posts are made");

  return postsSchema.parse(rows);
};

export const updatePost = (post: EditPost): void => {
  const { newPostSlug, postSlug, ...fields } = post;
  const { changes } = statements.updatePost.run({
    ...fields,
    newPostSlug: newPostSlug ?? postSlug,
    postSlug,
  });

  if (!changes) throw new Error("Couldn't update the post");
};

export const deletePost = (postSlug: PostSlug): void => {
  const { changes } = statements.deletePost.run({ postSlug });
  if (!changes) throw new Error("Couldn't delete the post");
};
