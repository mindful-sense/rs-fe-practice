"use client";

import { ROUTE_PATHS } from "@/config";
import { type SignUp, signup, signUpSchema } from "@/features/auth/shared";
import { useActionForm } from "@/features/auth/client";
import {
  LinkButton,
  FieldSet,
  Form,
  FormButtonBlock,
  FormError,
  FormField,
} from "@/components/ui";

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
    defaultValues: { login: "", password: "", passwordConfirm: "" },
    schema: signUpSchema,
    action: signup,
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
        <FormField
          id="passwordConfirm"
          type="password"
          label="Repeat password"
          placeholder=" "
          defaultValue={state.fields?.passwordConfirm}
          error={
            errors.passwordConfirm?.message ||
            state.errors?.passwordConfirm?.[0]
          }
          aria-required="true"
          {...register("passwordConfirm")}
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

      {(errors.root?.message || state.message) && (
        <FormError error={errors.root?.message || state.message} />
      )}
    </Form>
  );
}
