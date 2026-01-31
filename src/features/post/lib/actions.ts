"use server";
import "server-only";

import type { FormState } from "@/lib/shared";
import type { InputComment } from "./schema";

import * as z from "zod";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/features/auth/server";
import { getErrorMessage, insertComment } from "@/lib/server";
import { ROUTE_PATHS, delay } from "@/lib/shared";

import { inputCommentSchema } from "./schema";

export const sendComment = async (
  _prevState: FormState<InputComment>,
  payload: FormData,
): Promise<FormState<InputComment>> => {
  await delay();

  const formData = Object.fromEntries(payload);
  const { success, error, data } = inputCommentSchema.safeParse({
    ...formData,
    commentId: randomUUID(),
    commentedAt: new Date().toISOString(),
    authorId: (await getCurrentUser())?.userId,
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
