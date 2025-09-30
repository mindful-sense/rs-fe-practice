import { LoginForm } from "./LoginForm";

export default function Login() {
  return (
    <main className="mx-auto flex min-h-screen max-w-150 flex-col gap-8 px-26 py-30">
      <h2 className="text-center text-[2.5rem]/[2.5rem] font-semibold">
        Sign In
      </h2>
      <LoginForm />
    </main>
  );
}
