import { type PropsWithChildren } from "react";
import { Button } from "./Button";

interface Props extends PropsWithChildren {
  label: string;
  isPending: boolean;
}

export function FormButtonBlock({ label, isPending, children }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <Button type="submit" size="full" disabled={isPending}>
        {isPending ? "Loading..." : label}
      </Button>
      <p className="text-center text-sm">{children}</p>
    </div>
  );
}
