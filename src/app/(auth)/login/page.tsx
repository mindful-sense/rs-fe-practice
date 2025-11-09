import { H2 } from "@/components/ui";
import { LoginForm } from "@/features/auth/components";

export default function Login() {
  return (
    <div className="pt-35 pb-5">
      <main className="mx-auto flex max-w-88 flex-col gap-5 rounded-3xl bg-white/70 p-11 backdrop-blur-md">
        <H2>Sign In</H2>
        <LoginForm />
      </main>
    </div>
  );
}
