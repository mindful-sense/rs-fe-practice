"use client";

import type { BaseSyntheticEvent } from "react";
import type {
  FieldValues,
  Path,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import type { ZodType } from "zod";
import type { FormState } from "@/features/auth/shared";

import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props<T extends FieldValues> extends UseFormProps<T> {
  schema: ZodType<T, T>;
  action: (
    _prevState: FormState<T>,
    payload: FormData,
  ) => Promise<FormState<T>>;
}

interface Return<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
  state: FormState<T>;
  action: (payload: FormData) => void;
  isPending: boolean;
}

export const useActionForm = <T extends FieldValues>({
  schema,
  action,
  defaultValues,
  ...props
}: Props<T>): Return<T> => {
  const [state, formAction, isPending] = useActionState(action, {
    fields: defaultValues,
  } as FormState<T>);

  const form = useForm<T>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues,
    ...props,
  });
  const { setError, handleSubmit } = form;

  useEffect(() => {
    if (!state.errors) return;

    Object.entries(state.errors).forEach(([field, messages]) => {
      if (messages?.[0]) {
        setError(field as Path<T>, {
          type: "server",
          message: messages[0],
        });
      }
    });

    if (state.message) {
      setError("root", {
        type: "server",
        message: state.message,
      });
    }
  }, [state.errors, state.message, setError]);

  const onSubmit = handleSubmit((data) => {
    startTransition(() => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, value as string),
      );
      formAction(formData);
    });
  });

  return { form, onSubmit, state, isPending, action: formAction };
};
