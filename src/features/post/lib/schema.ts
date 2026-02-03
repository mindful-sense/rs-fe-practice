import * as z from "zod";
import { postSchema } from "@/lib/shared";

export const deletePostSchema = postSchema.pick({ postSlug: true }).strip();

export type DeletePost = z.infer<typeof deletePostSchema>;
