import { type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export function H2({ className, ...props }: ComponentProps<"h2">) {
  const classes = twMerge(
    "text-center text-3xl font-semibold mt-8 mb-10",
    className,
  );
  return <h2 className={classes} {...props} />;
}
