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
  type SigninFields,
  DEFAULT_FIELD_VALUES,
  createDefaultActionState,
  signin,
  signinSchema,
} from "@/features/auth/lib";

const getFieldValues = (formData: FormData): SigninFields => ({
  login: String(formData.get("login") ?? DEFAULT_FIELD_VALUES.login),
  password: String(formData.get("password") ?? DEFAULT_FIELD_VALUES.password),
});

export function LoginForm() {
  const [actionState, formAction, isPending] = useActionState(
    signin,
    createDefaultActionState(),
  );
  const { formData, errors } = actionState;
  const { login, password } = getFieldValues(formData);

  const {
    handleSubmit,
    register,
    formState: { errors: clientErrors },
    setError,
    clearErrors,
  } = useForm<SigninFields>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      ...DEFAULT_FIELD_VALUES,
      ...(Object.fromEntries(formData) ?? {}),
    },
  });

  const clearRootServerError = (): void => {
    if (clientErrors.root?.server) {
      clearErrors("root.server");
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

  const onSubmit = (_data: SigninFields, e?: BaseSyntheticEvent) => {
    const formEl = e?.target as HTMLFormElement | undefined;

    if (formEl) {
      startTransition(() => {
        formAction(new FormData(formEl));
      });
    }
  };

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-6"
    >
      <fieldset className="flex flex-col gap-2">
        <FormField>
          <Input
            id="login"
            type="text"
            placeholder="your_username"
            defaultValue={login}
            aria-invalid={
              (clientErrors.login ?? errors.login) ? "true" : "false"
            }
            aria-describedby="login-error"
            aria-required="true"
            {...register("login", { onChange: clearRootServerError })}
          >
            Username
          </Input>

          <FieldError
            errorId="login-error"
            serverError={errors.login}
            clientError={clientErrors.login}
          />
        </FormField>

        <FormField>
          <Input
            id="password"
            type="password"
            placeholder=" "
            defaultValue={password}
            aria-invalid={
              (clientErrors.password ?? errors.password) ? "true" : "false"
            }
            aria-describedby="password-error"
            aria-required="true"
            {...register("password", { onChange: clearRootServerError })}
          >
            Password
          </Input>

          <FieldError
            errorId="password-error"
            serverError={errors.password}
            clientError={clientErrors.password}
          />
        </FormField>
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
