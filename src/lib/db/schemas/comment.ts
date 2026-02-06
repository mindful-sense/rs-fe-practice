import * as z from "zod";
import { postSlugRule } from "./post";

export const commentSchema = z.strictObject({
  commentId: z.uuid(),
  content: z.string().min(1),
  commentedAt: z.iso.datetime(),
  authorId: z.uuid().nullable(),
  postSlug: postSlugRule,
});

export type Comment = z.infer<typeof commentSchema>;
export type CommentId = Comment["commentId"];
