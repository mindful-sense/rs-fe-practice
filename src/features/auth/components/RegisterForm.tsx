"use client";

import {
  FieldSet,
  Form,
  FormButtonBlock,
  FormError,
  FormField,
  LinkButton,
} from "@/components/ui";
import { ROUTE_PATHS } from "@/lib/shared";

import { useActionForm } from "../hooks/useActionForm";
import { signup } from "../lib/actions";
import { type SignUp, signUpSchema } from "../lib/schema";

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
    <Form action={action} onSubmit={onSubmit} noValidate>
      <FieldSet>
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
      </FieldSet>

      <FormButtonBlock label="Sign Up" isPending={isPending}>
        Already have an account?&nbsp;
        <LinkButton
          href={ROUTE_PATHS.LOGIN}
          intent="inline"
          decoration="underline"
        >
          Sign In
        </LinkButton>
      </FormButtonBlock>

      {generalError && <FormError error={generalError} />}
    </Form>
  );
}
