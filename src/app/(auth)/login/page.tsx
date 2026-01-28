import { H2 } from "@/components/ui";
import { LoginForm } from "@/features/auth/client";
import { AuthFormWrapper } from "@/features/auth/shared";

export default function Login() {
  return (
    <AuthFormWrapper>
      <H2>Sign In</H2>
      <LoginForm />
    </AuthFormWrapper>
  );
}
