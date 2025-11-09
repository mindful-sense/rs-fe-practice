import { type ComponentPropsWithoutRef } from "react";

export function FormField(props: ComponentPropsWithoutRef<"div">) {
  return <div {...props} className="flex flex-col gap-1" />;
}
