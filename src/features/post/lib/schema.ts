import * as z from "zod";
import { postSchema } from "@/lib/shared";

export const postsSchema = z.array(postSchema);
export const deletePostSchema = postSchema.pick({ postSlug: true }).strip();

export const editPostSchema = postSchema
  .omit({
    publishedAt: true,
    imagePreview: true,
  })
  .strip();

export type DeletePost = z.infer<typeof deletePostSchema>;
export type EditPost = z.infer<typeof editPostSchema>;
