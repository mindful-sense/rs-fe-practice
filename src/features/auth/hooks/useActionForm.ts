"use client";

import {
  type BaseSyntheticEvent,
  startTransition,
  useActionState,
  useEffect,
} from "react";
import {
  type FieldValues,
  type Path,
  type UseFormProps,
  type UseFormReturn,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ZodType } from "zod";
import { type FormState } from "@/features/auth/shared";

interface Props<TFieldValues extends FieldValues>
  extends UseFormProps<TFieldValues> {
  schema: ZodType<TFieldValues, TFieldValues>;
  action: (
    _prevState: FormState<TFieldValues>,
    payload: FormData,
  ) => Promise<FormState<TFieldValues>>;
}

interface Return<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
  state: FormState<TFieldValues>;
  action: (payload: FormData) => void;
  isPending: boolean;
}

export const useActionForm = <TFieldValues extends FieldValues>({
  schema,
  action,
  ...props
}: Props<TFieldValues>): Return<TFieldValues> => {
  const [state, formAction, isPending] = useActionState(
    action,
    {} as FormState<TFieldValues>,
  );

  const form = useForm<TFieldValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    ...props,
  });

  const { setError, handleSubmit } = form;

  useEffect(() => {
    if (state.errors) {
      Object.entries(state.errors).forEach(([key, messages]) => {
        if (messages?.[0]) {
          setError(key as Path<TFieldValues>, {
            type: "server",
            message: messages[0],
          });
        }
      });
    }
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
