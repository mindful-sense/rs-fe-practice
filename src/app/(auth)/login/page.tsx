import { H2 } from "@/components/ui";
import { LoginForm } from "@/features/auth/client";
import { AuthFormWrapper } from "@/features/auth/server";

export default function Login() {
  return (
    <AuthFormWrapper>
      <H2 className="m-0 p-0">Sign In</H2>
      <LoginForm />
    </AuthFormWrapper>
  );
}
