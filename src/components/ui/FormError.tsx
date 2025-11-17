import { type PropsWithChildren } from "react";

export function FormError({ children }: PropsWithChildren) {
  return (
    <p
      role="alert"
      className="bg-danger-50 flex min-h-16 items-center justify-center rounded-2xl p-3 text-center text-white"
    >
      Error: {children}
    </p>
  );
}
