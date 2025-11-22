import { FormWrapper, H2 } from "@/components/ui";
import { LoginForm } from "@/features/auth/client";

export default function Login() {
  return (
    <FormWrapper>
      <H2>Sign In</H2>
      <LoginForm />
    </FormWrapper>
  );
}
