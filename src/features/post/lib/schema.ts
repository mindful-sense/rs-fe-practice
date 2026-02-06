import * as z from "zod";
import { postSchema, postSlugRule } from "@/lib/shared";

export const postsSchema = z.array(postSchema);
export const deletePostSchema = postSchema.pick({ postSlug: true }).strip();

export const editPostSchema = z.object({
  ...postSchema.omit({
    publishedAt: true,
    imagePreview: true,
  }).shape,
  newPostSlug: postSlugRule.optional(),
});

export type DeletePost = z.infer<typeof deletePostSchema>;
export type EditPost = z.infer<typeof editPostSchema>;
