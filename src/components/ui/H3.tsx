import { type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export function H3({ className, ...props }: ComponentProps<"h3">) {
  const classes = twMerge("text-2xl font-semibold", className);
  return <h3 className={classes} {...props} />;
}
