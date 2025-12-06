import { type ReactNode } from "react";

export function FormWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="mt-18 flex min-h-[calc(100vh-72px)] items-center justify-center py-4">
      <main className="flex max-w-88 flex-col gap-5 rounded-3xl bg-white/70 p-11 backdrop-blur-md">
        {children}
      </main>
    </div>
  );
}
