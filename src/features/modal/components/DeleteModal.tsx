"use client";

import * as z from "zod";
import { useTransition } from "react";
import { Button, H3 } from "@/components/ui";
import {
  closeModal,
  selectData,
  useAppDispatch,
  useAppSelector,
} from "@/lib/client";

interface Props<T> {
  title: string;
  schema: z.ZodType<T>;
  action: (data: T) => Promise<void>;
}

export function DeleteModal<T>({ title, schema, action }: Props<T>) {
  const dispatch = useAppDispatch();
  const { success, error, data } = schema.safeParse(useAppSelector(selectData));
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!success) {
      console.error(error);
      return;
    }

    startTransition(async () => {
      await action(data);
      dispatch(closeModal());
    });
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <H3>{title}</H3>
        <p>This action cannot be undone. Are you sure you want to proceed?</p>
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
          disabled={isPending || !success}
          onClick={handleDelete}
        />
      </div>
    </>
  );
}
