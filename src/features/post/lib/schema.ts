import * as z from "zod";
import { commentSchema } from "@/lib/shared";

export const inputCommentSchema = commentSchema.extend({
  content: z
    .string()
    .trim()
    .min(3, { error: "Min 3 characters" })
    .max(3000, { error: "Max 3000 characters" }),
  authorId: z.uuid(),
});

export const inputCommentClientSchema = inputCommentSchema.pick({
  content: true,
  postSlug: true,
});

export const deleteCommentSchema = commentSchema
  .pick({
    commentId: true,
    postSlug: true,
  })
  .strip();

export type InputComment = z.infer<typeof inputCommentSchema>;
export type InputCommentClient = z.infer<typeof inputCommentClientSchema>;
