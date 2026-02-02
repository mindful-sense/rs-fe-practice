"use client";

import { useTransition } from "react";
import { Button, H3 } from "@/components/ui";
import { deletePostSchema, removePost } from "@/features/post/shared";
import {
  closeModal,
  selectData,
  useAppDispatch,
  useAppSelector,
} from "@/lib/client";

export function DeletePostModal() {
  const dispatch = useAppDispatch();
  const { success, error, data } = deletePostSchema.safeParse(
    useAppSelector(selectData),
  );
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!success) {
      console.error(error);
      return;
    }

    startTransition(async () => {
      await removePost(data);
      dispatch(closeModal());
    });
  };

  return (
    <div className="bg-elembg flex w-full max-w-sm flex-col gap-20 rounded-3xl p-8">
      <div className="flex flex-col gap-2">
        <H3>Delete Post?</H3>
        <p>
          This action cannot be undone. Are you sure you want to delete this
          post?
        </p>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          text="Cancel"
          intent="secondary"
          disabled={isPending}
          onClick={() => dispatch(closeModal())}
        />
        <Button
          text={isPending ? "Deleting..." : "Delete"}
          color="danger"
          disabled={isPending}
          onClick={handleDelete}
        />
      </div>
    </div>
  );
}
