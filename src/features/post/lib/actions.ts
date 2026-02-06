"use server";

import "server-only";
import type { FormState } from "@/lib/shared";
import type { DeletePost, EditPost } from "./schema";

import * as z from "zod";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/features/auth/server";
import { deletePost, getErrorMessage, updatePost } from "@/lib/server";
import { ROLES, ROUTE_PATHS, delay } from "@/lib/shared";

import { deletePostSchema, editPostSchema } from "./schema";

export const removePost = async (payload: DeletePost): Promise<void> => {
  await delay();

  const user = await getCurrentUser();
  if (!user || user.roleId !== ROLES.ADMIN) {
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

export const savePostChanges = async (
  _prevState: FormState<EditPost>,
  payload: FormData,
): Promise<FormState<EditPost>> => {
  await delay();

  const user = await getCurrentUser();
  const formData = Object.fromEntries(payload);
  const isModerator =
    user?.roleId === ROLES.MODERATOR || user?.roleId === ROLES.ADMIN;

  if (!user || !isModerator) {
    return {
      message: "You must be an admin or moderator to edit posts",
      fields: formData,
    };
  }

  const { success, error, data } = editPostSchema.safeParse(formData);
  if (!success) {
    return {
      fields: formData,
      errors: z.flattenError(error).fieldErrors,
    };
  }

  try {
    updatePost(data);
  } catch (error) {
    return { message: getErrorMessage(error), fields: data };
  }
  redirect(`${ROUTE_PATHS.POSTS}/${data.postSlug}`);
};
