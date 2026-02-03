import { type ReactNode } from "react";
import { Button } from "@/components/ui";

interface Props {
  label: string;
  isPending: boolean;
  children: ReactNode;
}

export function AuthFormButtonBlock({ label, isPending, children }: Props) {
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
