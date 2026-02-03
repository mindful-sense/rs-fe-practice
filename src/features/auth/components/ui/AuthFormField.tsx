import { type ComponentPropsWithRef } from "react";
import { Input, InputError } from "@/components/ui";

interface Props extends Omit<ComponentPropsWithRef<"input">, "className"> {
  label: string;
  error?: string;
}

export function AuthFormField({ id, error, ...props }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <Input
        id={id}
        aria-invalid={!!error}
        aria-describedby={`${id}-error`}
        {...props}
      />
      <InputError errorId={`${id}-error`} error={error} />
    </div>
  );
}
