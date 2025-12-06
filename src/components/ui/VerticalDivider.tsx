import { twMerge } from "tailwind-merge";

export function VerticalDivider({ className = "" }: { className?: string }) {
  const classes = twMerge(
    "w-px self-stretch rounded-full bg-gray-200",
    className,
  );
  return (
    <div role="separator" aria-orientation="vertical" className={classes} />
  );
}
