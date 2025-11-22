import { FormWrapper, H2 } from "@/components/ui";
import { RegisterForm } from "@/features/auth/client";

export default function Register() {
  return (
    <FormWrapper>
      <H2>Sign Up</H2>
      <RegisterForm />
    </FormWrapper>
  );
}
