import { type ReactNode } from "react";

export function AuthFormWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center">
      <main className="bg-elembg flex max-w-sm flex-col gap-5 rounded-3xl p-11">
        {children}
      </main>
    </div>
  );
}
