import { type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export function H1({ className, ...props }: ComponentProps<"h1">) {
  const classes = twMerge(
    "max-w-3xl text-center text-5xl font-semibold",
    className,
  );
  return <h1 className={classes} {...props} />;
}
