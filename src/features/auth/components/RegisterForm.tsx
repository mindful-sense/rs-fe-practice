"use client";

import {
  FormError,
  FormField,
  FormFieldSet,
  LinkButton,
} from "@/components/ui";
import { useActionForm } from "@/lib/client";
import { ROUTE_PATHS } from "@/lib/shared";

import { signup } from "../lib/actions";
import { type SignUp, signUpSchema } from "../lib/schema";
import { AuthForm, AuthFormButtonBlock } from "./ui";

export function RegisterForm() {
  const {
    form: {
      register,
      formState: { errors },
    },
    onSubmit,
    state,
    action,
    isPending,
  } = useActionForm<SignUp>({
    defaultValues: { login: "", password: "", passcheck: "" },
    schema: signUpSchema,
    action: signup,
  });

  const generalError = errors.root?.message || state.message;
  const loginError = errors.login?.message || state.errors?.login?.[0];
  const passwordError = errors.password?.message || state.errors?.password?.[0];
  const passcheckError =
    errors.passcheck?.message || state.errors?.passcheck?.[0];

  return (
    <AuthForm action={action} onSubmit={onSubmit} noValidate>
      <FormFieldSet>
        <FormField
          id="login"
          type="text"
          label="Username"
          placeholder="your_username"
          defaultValue={state.fields?.login}
          error={loginError}
          aria-required="true"
          {...register("login")}
        />
        <FormField
          id="password"
          type="password"
          label="Password"
          placeholder=" "
          defaultValue={state.fields?.password}
          error={passwordError}
          aria-required="true"
          {...register("password")}
        />
        <FormField
          id="passcheck"
          type="password"
          label="Repeat password"
          placeholder=" "
          defaultValue={state.fields?.passcheck}
          error={passcheckError}
          aria-required="true"
          {...register("passcheck")}
        />
      </FormFieldSet>

      <AuthFormButtonBlock label="Sign Up" isPending={isPending}>
        Already have an account?&nbsp;
        <LinkButton
          href={ROUTE_PATHS.LOGIN}
          text="Sign In"
          intent="inline"
          decoration="underline"
        />
      </AuthFormButtonBlock>

      {generalError && <FormError error={generalError} />}
    </AuthForm>
  );
}
