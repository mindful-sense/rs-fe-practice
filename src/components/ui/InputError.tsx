import { twMerge } from "tailwind-merge";

export function InputError({
  errorId,
  error,
  className,
}: {
  errorId: string;
  error?: string;
  className?: string;
}) {
  if (!error) return null;

  const classes = twMerge("text-danger min-h-5 text-sm", className);

  return (
    <p id={errorId} role="alert" className={classes}>
      {error}
    </p>
  );
}
