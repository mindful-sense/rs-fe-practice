import { type ComponentPropsWithRef } from "react";
import { Input } from "@/components/ui";
import { AuthFieldError } from "./AuthFieldError";

export function AuthFormField({
  id,
  error,
  ...props
}: Omit<ComponentPropsWithRef<"input">, "className"> & {
  label: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Input
        id={id}
        aria-invalid={!!error}
        aria-describedby={`${id}-error`}
        {...props}
      />
      <AuthFieldError errorId={`${id}-error`} error={error} />
    </div>
  );
}
