import { type PropsWithChildren } from "react";

export const FieldSet = ({ children }: PropsWithChildren) => (
  <fieldset className="flex flex-col gap-2">{children}</fieldset>
);
