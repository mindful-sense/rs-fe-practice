import { type ReactNode } from "react";
import { Button } from "./Button";

export function FormButtonBlock({
  label,
  isPending,
  children,
}: {
  label: string;
  isPending: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <Button type="submit" size="full" disabled={isPending}>
        {isPending ? "Loading..." : label}
      </Button>
      <p className="text-center text-sm">{children}</p>
    </div>
  );
}
