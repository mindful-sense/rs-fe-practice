import { type ComponentProps } from "react";

export function H2(props: Omit<ComponentProps<"h2">, "className">) {
  return <h2 className="text-center text-3xl font-semibold" {...props} />;
}
