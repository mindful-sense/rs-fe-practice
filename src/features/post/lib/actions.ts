"use server";
import "server-only";

import type { FormState } from "@/lib/shared";
import type { DeletePost, InputComment } from "./schema";

import * as z from "zod";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/features/auth/server";
import {
  deleteAnyComment,
  deletePost,
  deleteSelfComment,
  getErrorMessage,
  insertComment,
} from "@/lib/server";
import { ROLES, ROUTE_PATHS, delay } from "@/lib/shared";

import {
  deleteCommentSchema,
  deletePostSchema,
  inputCommentSchema,
} from "./schema";

export const removePost = async (postData: DeletePost): Promise<void> => {
  await delay();

  const user = await getCurrentUser();
  if (
    !user ||
    (user.roleId !== ROLES.MODERATOR && user.roleId !== ROLES.ADMIN)
  ) {
    console.warn("Unauthorized");
    return;
  }

  const { success, error, data } = deletePostSchema.safeParse(postData);

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

export const sendComment = async (
  _prevState: FormState<InputComment>,
  payload: FormData,
): Promise<FormState<InputComment>> => {
  await delay();

  const user = await getCurrentUser();
  if (!user) {
    return {
      message: "You must be logged in to comment.",
      fields: { content: payload.get("content") as string },
    };
  }

  const formData = Object.fromEntries(payload);
  const { success, error, data } = inputCommentSchema.safeParse({
    ...formData,
    commentId: randomUUID(),
    commentedAt: new Date().toISOString(),
    authorId: user.userId,
  });

  if (!success) {
    return {
      fields: { content: formData.content } as Partial<InputComment>,
      errors: z.flattenError(error).fieldErrors,
    };
  }

  try {
    insertComment(data);
  } catch (error) {
    return {
      message: getErrorMessage(error),
      fields: { content: data.content } as Partial<InputComment>,
    };
  }

  redirect(`${ROUTE_PATHS.POSTS}/${data.postSlug}`);
};

export const removeComment = async (payload: FormData): Promise<void> => {
  await delay();

  const user = await getCurrentUser();
  if (!user) {
    console.warn("Unauthorized");
    return;
  }

  const formData = Object.fromEntries(payload);
  const { success, error, data } = deleteCommentSchema.safeParse(formData);

  if (!success) {
    console.error(error);
    return;
  }

  try {
    if (user.roleId === ROLES.MODERATOR || user.roleId === ROLES.ADMIN) {
      deleteAnyComment(data.commentId);
    } else {
      deleteSelfComment(data.commentId, user.userId);
    }
  } catch (error) {
    console.error(error);
    return;
  }

  revalidatePath(`${ROUTE_PATHS.POSTS}/${data.postSlug}`);
};
