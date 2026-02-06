"use client";

import type { EditPost } from "../lib/schema";

import {
  Button,
  FormArea,
  FormError,
  FormField,
  FormFieldSet,
} from "@/components/ui";
import { openModal, useActionForm, useAppDispatch } from "@/lib/client";

import { savePostChanges } from "../lib/actions";
import { editPostSchema } from "../lib/schema";
import { MODAL_VIEW } from "@/features/modal/shared";

interface Props {
  post: EditPost;
  isAdmin: boolean;
}

export function PostEditForm({ post, isAdmin }: Props) {
  const dispatch = useAppDispatch();

  const {
    form: {
      register,
      formState: { errors },
    },
    onSubmit,
    state,
    action,
    isPending,
  } = useActionForm<EditPost>({
    defaultValues: post,
    schema: editPostSchema,
    action: savePostChanges,
  });

  const generalError = errors.root?.message || state.message;
  const h1Error = errors.h1?.message || state.errors?.h1?.[0];
  const leadError = errors.lead?.message || state.errors?.lead?.[0];
  const contentError = errors.content?.message || state.errors?.content?.[0];
  const conclusionError =
    errors.conclusion?.message || state.errors?.conclusion?.[0];
  const imageLeadError =
    errors.imageLead?.message || state.errors?.imageLead?.[0];

  return (
    <form
      action={action}
      onSubmit={onSubmit}
      noValidate
      className="bg-elembg mx-auto flex w-3xl flex-col gap-6 rounded-3xl p-11"
    >
      <input type="hidden" value={post.postSlug} {...register("postSlug")} />

      <FormFieldSet>
        <FormField
          id="h1"
          type="text"
          label="Post title"
          defaultValue={state.fields?.h1}
          error={h1Error}
          aria-required="true"
          {...register("h1")}
        />
        <FormField
          id="imageLead"
          type="text"
          label="Image link"
          defaultValue={state.fields?.imageLead}
          error={imageLeadError}
          aria-required="true"
          {...register("imageLead")}
        />
        <FormArea
          id="lead"
          label="Post lead"
          defaultValue={state.fields?.lead}
          error={leadError}
          aria-required="true"
          {...register("lead")}
        />
        <FormArea
          id="content"
          label="Content"
          defaultValue={state.fields?.content}
          error={contentError}
          aria-required="true"
          {...register("content")}
        />
        <FormArea
          id="conclusion"
          label="Conclusion"
          defaultValue={state.fields?.conclusion}
          error={conclusionError}
          aria-required="true"
          {...register("conclusion")}
        />
      </FormFieldSet>

      <div className="flex gap-2">
        {isAdmin && (
          <Button
            type="button"
            text="Delete post"
            size="full"
            color="danger"
            onClick={() =>
              dispatch(
                openModal({
                  view: MODAL_VIEW.DELETE_POST,
                  data: { postSlug: post.postSlug },
                }),
              )
            }
          />
        )}
        <Button
          type="submit"
          size="full"
          text={isPending ? "Saving..." : "Save changes"}
          disabled={isPending}
        />
      </div>

      {generalError && <FormError error={generalError} />}
    </form>
  );
}
