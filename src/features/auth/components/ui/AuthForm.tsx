import { type ComponentProps } from "react";

type Props = Omit<ComponentProps<"form">, "className">;

export function AuthForm({ children, ...props }: Props) {
  return (
    <form className="flex flex-col gap-6" {...props}>
      {children}
    </form>
  );
}
