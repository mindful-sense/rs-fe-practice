import { type ComponentPropsWithoutRef } from "react";

export function FormField(
  props: Omit<ComponentPropsWithoutRef<"div">, "className">,
) {
  return <div {...props} className="flex flex-col gap-1" />;
}
