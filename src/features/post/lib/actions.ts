"use server";

import "server-only";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/features/auth/server";
import { deletePost } from "@/lib/server";
import { ROLES, ROUTE_PATHS, delay } from "@/lib/shared";

import { type DeletePost, deletePostSchema } from "./schema";

export const removePost = async (payload: DeletePost): Promise<void> => {
  await delay();

  const user = await getCurrentUser();
  const isModerator =
    user?.roleId === ROLES.MODERATOR || user?.roleId === ROLES.ADMIN;

  if (!user || !isModerator) {
    console.warn("Unauthorized");
    return;
  }

  const { success, error, data } = deletePostSchema.safeParse(payload);
  if (!success) {
    console.error(error);
    return;
  }

  try {
    deletePost(data.postSlug);
  } catch (error) {
    console.error(error);
    return;
  }
  redirect(ROUTE_PATHS.HOME);
};
