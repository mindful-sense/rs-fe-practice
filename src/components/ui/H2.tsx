import { type ComponentPropsWithoutRef } from "react";

export function H2(props: ComponentPropsWithoutRef<"h2">) {
  return <h2 {...props} className="text-center text-3xl font-semibold" />;
}
