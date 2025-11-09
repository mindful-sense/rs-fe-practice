"use client";

import { useEffect, useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PATHS } from "@/config/constants";

import {
  Button,
  FieldError,
  FormError,
  FormField,
  Input,
} from "@/components/ui";

import {
  type ActionState,
  getDefaultFieldErrors,
  signin,
  signinSchema,
} from "@/features/auth/lib";

const DEFAULT_FIELD_VALUES = {
  login: "",
  password: "",
};

const getDefaultActionState = (): ActionState => ({
  ok: true,
  formData: new FormData(),
  errors: getDefaultFieldErrors(),
  error: "",
});

export function LoginForm() {
  const [actionState, formAction, isPending] = useActionState(
    signin,
    getDefaultActionState(),
  );
  const { formData, errors } = actionState;

  const {
    handleSubmit,
    register,
    formState: { errors: clientErrors },
    setError,
    clearErrors,
  } = useForm({
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

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit(() => {})}
      noValidate
      className="flex flex-col gap-6"
    >
      <fieldset className="flex flex-col gap-2">
        <FormField>
          <Input
            id="login"
            type="text"
            placeholder="your_username"
            defaultValue={(formData.get("login") ?? "") as string}
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
            defaultValue={(formData.get("password") ?? "") as string}
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
          <Button href={PATHS.REGISTER} intent="inline" className="underline">
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
