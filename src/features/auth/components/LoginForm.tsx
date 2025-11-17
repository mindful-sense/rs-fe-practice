"use client";

import {
  type BaseSyntheticEvent,
  useEffect,
  useActionState,
  startTransition,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ROUTE_PATHS } from "@/config";
import {
  Button,
  FieldError,
  FormError,
  FormField,
  Input,
} from "@/components/ui";
import {
  type SignInFields,
  DEFAULT_FIELD_VALUES,
  createDefaultActionState,
  signin,
  signInSchema,
} from "@/features/auth/shared";

const LOGIN_FIELDS: Array<{
  id: keyof SignInFields;
  label: string;
  type: "text" | "password";
  placeholder: string;
  errorId: string;
}> = [
  {
    id: "login",
    label: "Username",
    type: "text",
    placeholder: "your_username",
    errorId: "login-error",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: " ",
    errorId: "password-error",
  },
];

const getFieldValues = (formData: FormData): SignInFields => ({
  login: String(formData.get("login") ?? DEFAULT_FIELD_VALUES.login),
  password: String(formData.get("password") ?? DEFAULT_FIELD_VALUES.password),
});

export function LoginForm() {
  const [actionState, formAction, isPending] = useActionState(
    signin,
    createDefaultActionState(),
  );
  const { formData, errors } = actionState;
  const serverValues = getFieldValues(formData);

  const {
    handleSubmit,
    register,
    formState: { errors: clientErrors },
    setError,
    clearErrors,
  } = useForm<SignInFields>({
    resolver: zodResolver(signInSchema),
    defaultValues: { ...getFieldValues(formData) },
  });

  const clearRootServerError = (): void => {
    if (clientErrors.root?.server) {
      clearErrors("root.server");
    }
  };

  const onSubmit = (_data: SignInFields, event?: BaseSyntheticEvent): void => {
    const formEl = event?.target as HTMLFormElement | undefined;

    if (formEl) {
      startTransition(() => {
        formAction(new FormData(formEl));
      });
    }
  };

  useEffect(() => {
    if (!actionState.ok && actionState.error) {
      setError("root.server", {
        type: "server",
        message: actionState.error,
      });
    }
  }, [actionState, setError]);

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-6"
    >
      <fieldset className="flex flex-col gap-2">
        {LOGIN_FIELDS.map(({ id, label, type, placeholder, errorId }) => (
          <FormField key={id}>
            <Input
              id={id}
              type={type}
              placeholder={placeholder}
              defaultValue={serverValues[id]}
              aria-invalid={(clientErrors[id] ?? errors[id]) ? "true" : "false"}
              aria-describedby={errorId}
              aria-required="true"
              {...register(id, { onChange: clearRootServerError })}
            >
              {label}
            </Input>

            <FieldError
              errorId={errorId}
              serverError={errors[id]}
              clientError={clientErrors[id]}
            />
          </FormField>
        ))}
      </fieldset>

      <div className="flex flex-col gap-3">
        <Button type="submit" size="full" disabled={isPending}>
          {isPending ? "Loading..." : "Sign In"}
        </Button>

        <p className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Button
            href={ROUTE_PATHS.REGISTER}
            intent="inline"
            decoration="underline"
          >
            Sign Up
          </Button>
        </p>
      </div>

      {clientErrors.root?.server && (
        <FormError>{clientErrors.root.server.message}</FormError>
      )}
    </form>
  );
}
