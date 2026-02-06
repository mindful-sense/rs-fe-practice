import "server-only";
import type { BlogPost } from "@/lib/server";
import type { PostSlug } from "@/lib/shared";
import type { EditPost } from "./schema";

import { getErrorMessage, selectPost, selectEditPost } from "@/lib/server";

type Err = { error: string };
type ReturnBlogPost = BlogPost | Err;
type ReturnEditPost = { post: EditPost } | Err;

export const getBlogPost = (postSlug: PostSlug): ReturnBlogPost => {
  try {
    return selectPost(postSlug);
  } catch (error) {
    console.error(error);
    return { error: getErrorMessage(error) };
  }
};

export const getEditPost = (postSlug: PostSlug): ReturnEditPost => {
  try {
    return { post: selectEditPost(postSlug) };
  } catch (error) {
    console.error(error);
    return { error: getErrorMessage(error) };
  }
};
