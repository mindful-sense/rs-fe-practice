"use client";

import type { PostSlug } from "@/lib/shared";
import type { InputCommentClient } from "../lib/schema";

import { Button, InputError } from "@/components/ui";
import { useActionForm } from "@/lib/client";

import { sendComment } from "../lib/actions";
import { inputCommentClientSchema } from "../lib/schema";

export function CommentForm({ postSlug }: { postSlug: PostSlug }) {
  const {
    form: {
      register,
      formState: { errors },
    },
    onSubmit,
    state,
    action,
    isPending,
  } = useActionForm<InputCommentClient>({
    defaultValues: { content: "" },
    schema: inputCommentClientSchema,
    action: sendComment,
  });

  const generalError = errors.root?.message || state.message;
  const contentError = errors.content?.message || state.errors?.content?.[0];
  const error = contentError || generalError;

  return (
    <form
      action={action}
      onSubmit={onSubmit}
      noValidate
      className="focus-within:outline-accent bg-elembg flex min-h-40 flex-col gap-1 rounded-2xl border border-transparent p-2 outline-2 -outline-offset-2 outline-transparent transition-colors duration-300 focus-within:not-placeholder-shown:border-neutral-200 hover:border-neutral-200"
    >
      <input type="hidden" value={postSlug} {...register("postSlug")} />

      <textarea
        id="content"
        placeholder="Write your comment"
        className="block min-h-40 w-full resize-none mask-b-from-80% p-3 font-normal tracking-wide outline-none placeholder:text-neutral-300"
        defaultValue={state.fields?.content}
        aria-required="true"
        aria-invalid={!!error}
        aria-describedby="content-error"
        {...register("content")}
      />

      <div className="flex flex-row-reverse items-center justify-between">
        <Button
          type="submit"
          text={isPending ? "Sending..." : "Send"}
          disabled={isPending}
        />
        <InputError errorId="content-error" error={error} className="pl-3" />
      </div>
    </form>
  );
}
