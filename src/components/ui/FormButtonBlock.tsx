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
      <Button
        type="submit"
        text={isPending ? "Loading..." : label}
        size="full"
        disabled={isPending}
      />
      <p className="text-center text-sm">{children}</p>
    </div>
  );
}
