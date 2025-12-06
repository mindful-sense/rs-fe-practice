"use client";

import { ROUTE_PATHS } from "@/config";
import { type SignIn, signin, signInSchema } from "@/features/auth/shared";
import { useActionForm } from "@/features/auth/client";
import {
  LinkButton,
  FieldSet,
  Form,
  FormButtonBlock,
  FormError,
  FormField,
} from "@/components/ui";

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

  return (
    <Form action={action} onSubmit={onSubmit} noValidate>
      <FieldSet>
        <FormField
          id="login"
          type="text"
          label="Username"
          placeholder="your_username"
          defaultValue={state.fields?.login}
          error={errors.login?.message || state.errors?.login?.[0]}
          aria-required="true"
          {...register("login")}
        />
        <FormField
          id="password"
          type="password"
          label="Password"
          placeholder=" "
          defaultValue={state.fields?.password}
          error={errors.password?.message || state.errors?.password?.[0]}
          aria-required="true"
          {...register("password")}
        />
      </FieldSet>

      <FormButtonBlock label="Sign In" isPending={isPending}>
        Don&apos;t have an account?&nbsp;
        <LinkButton
          href={ROUTE_PATHS.REGISTER}
          intent="inline"
          decoration="underline"
        >
          Sign Up
        </LinkButton>
      </FormButtonBlock>

      {(errors.root?.message || state.message) && (
        <FormError error={errors.root?.message || state.message} />
      )}
    </Form>
  );
}
