import { type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export function H2({ className, ...props }: ComponentProps<"h2">) {
  const classes = twMerge("text-center text-3xl font-semibold", className);
  return <h2 className={classes} {...props} />;
}
