import { type ComponentPropsWithRef } from "react";

export function Form({
  children,
  ...props
}: Omit<ComponentPropsWithRef<"form">, "className">) {
  return (
    <form className="flex flex-col gap-6" {...props}>
      {children}
    </form>
  );
}
