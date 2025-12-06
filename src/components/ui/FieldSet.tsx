import { type ReactNode } from "react";

export const FieldSet = ({ children }: { children: ReactNode }) => (
  <fieldset className="flex flex-col gap-2">{children}</fieldset>
);
