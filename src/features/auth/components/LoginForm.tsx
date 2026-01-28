"use client";

import { LinkButton } from "@/components/ui";
import { ROUTE_PATHS } from "@/lib/shared";

import { useActionForm } from "../hooks/useActionForm";
import { signin } from "../lib/actions";
import { type SignIn, signInSchema } from "../lib/schema";

import {
  AuthFieldSet,
  AuthForm,
  AuthFormButtonBlock,
  AuthFormError,
  AuthFormField,
} from "./ui";

export function LoginForm() {
  const {
    form: {
      register,
      formState: { errors },
    },
    onSubmit,
    state,
    action,
    isPending,
  } = useActionForm<SignIn>({
    defaultValues: { login: "", password: "" },
    schema: signInSchema,
    action: signin,
  });

  const generalError = errors.root?.message || state.message;
  const loginError = errors.login?.message || state.errors?.login?.[0];
  const passwordError = errors.password?.message || state.errors?.password?.[0];

  return (
    <AuthForm action={action} onSubmit={onSubmit} noValidate>
      <AuthFieldSet>
        <AuthFormField
          id="login"
          type="text"
          label="Username"
          placeholder="your_username"
          defaultValue={state.fields?.login}
          error={loginError}
          aria-required="true"
          {...register("login")}
        />
        <AuthFormField
          id="password"
          type="password"
          label="Password"
          placeholder=" "
          defaultValue={state.fields?.password}
          error={passwordError}
          aria-required="true"
          {...register("password")}
        />
      </AuthFieldSet>

      <AuthFormButtonBlock label="Sign In" isPending={isPending}>
        Don&apos;t have an account?&nbsp;
        <LinkButton
          href={ROUTE_PATHS.REGISTER}
          text="Sign Up"
          intent="inline"
          decoration="underline"
        />
      </AuthFormButtonBlock>

      {generalError && <AuthFormError error={generalError} />}
    </AuthForm>
  );
}
