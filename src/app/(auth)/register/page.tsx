import { H2 } from "@/components/ui";
import { RegisterForm } from "@/features/auth/client";
import { AuthFormWrapper } from "@/features/auth/shared";

export default function Register() {
  return (
    <AuthFormWrapper>
      <H2>Sign Up</H2>
      <RegisterForm />
    </AuthFormWrapper>
  );
}
