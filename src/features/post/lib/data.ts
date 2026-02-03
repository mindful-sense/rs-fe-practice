import "server-only";
import { type BlogPost, getErrorMessage, selectPost } from "@/lib/server";
import { type PostSlug } from "@/lib/shared";

export const getPostBySlug = (slug: PostSlug): BlogPost | { error: string } => {
  try {
    return selectPost(slug);
  } catch (error) {
    console.error(error);
    return { error: getErrorMessage(error) };
  }
};
