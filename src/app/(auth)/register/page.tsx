import { H2 } from "@/components/ui";
import { RegisterForm } from "@/features/auth/client";
import { AuthFormWrapper } from "@/features/auth/server";

export default function Register() {
  return (
    <AuthFormWrapper>
      <H2 className="m-0 p-0">Sign Up</H2>
      <RegisterForm />
    </AuthFormWrapper>
  );
}
