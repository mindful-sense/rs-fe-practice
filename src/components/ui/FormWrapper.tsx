import { type ReactNode } from "react";

export function FormWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center">
      <main className="flex max-w-88 flex-col gap-5 rounded-3xl bg-white/70 p-11 backdrop-blur-md">
        {children}
      </main>
    </div>
  );
}
