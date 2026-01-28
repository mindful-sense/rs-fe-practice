import "server-only";

import type { BlogPost, PostSlug } from "@/lib/server";
import type { PublicUser, UserId } from "@/lib/shared";

import {
  getErrorMessage,
  selectPostBySlug,
  selectPublicUserById,
} from "@/lib/server";

export const getPostBySlug = (slug: PostSlug): BlogPost | { error: string } => {
  try {
    return selectPostBySlug(slug);
  } catch (error) {
    console.error(error);
    return { error: getErrorMessage(error) };
  }
};

export const getPublicUser = (userId: UserId): PublicUser | null => {
  try {
    return selectPublicUserById(userId);
  } catch (error) {
    console.error(error);
    return null;
  }
};
