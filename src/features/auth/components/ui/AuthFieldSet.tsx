import { type ReactNode } from "react";

export function AuthFieldSet({ children }: { children: ReactNode }) {
  return <fieldset className="flex flex-col gap-2">{children}</fieldset>;
}
