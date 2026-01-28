import { type ComponentProps } from "react";

export function AuthForm({
  children,
  ...props
}: Omit<ComponentProps<"form">, "className">) {
  return (
    <form className="flex flex-col gap-6" {...props}>
      {children}
    </form>
  );
}
