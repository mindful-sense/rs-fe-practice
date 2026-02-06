import { type ReactNode } from "react";

export function FormFieldSet({ children }: { children: ReactNode }) {
  return <fieldset className="flex flex-col gap-2">{children}</fieldset>;
}
