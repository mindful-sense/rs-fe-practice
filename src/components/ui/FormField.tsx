import { type ComponentPropsWithRef } from "react";
import { FieldError } from "./FieldError";
import { Input } from "./Input";

interface Props extends Omit<ComponentPropsWithRef<"input">, "className"> {
  label: string;
  error?: string;
}

export function FormField({ id, error, ...props }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <Input
        id={id}
        aria-invalid={!!error}
        aria-describedby={`${id}-error`}
        {...props}
      />
      <FieldError errorId={`${id}-error`} error={error} />
    </div>
  );
}
