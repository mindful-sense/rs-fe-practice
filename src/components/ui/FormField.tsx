import type { ComponentPropsWithRef as RefProps } from "react";
import type { InputBaseProps, InputProps, AreaProps } from "@/components/ui";
import { Input, InputError, TextArea } from "@/components/ui";

interface BaseProps extends InputBaseProps {
  error?: string;
}

function Wrapper({ id, error, children }: RefProps<"div"> & BaseProps) {
  return (
    <div className="flex flex-col gap-1">
      {children}
      <InputError errorId={`${id}-error`} error={error} />
    </div>
  );
}

export function FormField({ id, error, ...props }: InputProps & BaseProps) {
  return (
    <Wrapper id={id} error={error}>
      <Input
        id={id}
        aria-invalid={!!error}
        aria-describedby={`${id}-error`}
        {...props}
      />
    </Wrapper>
  );
}

export function FormArea({ id, error, ...props }: AreaProps & BaseProps) {
  return (
    <Wrapper id={id} error={error}>
      <TextArea
        id={id}
        aria-invalid={!!error}
        aria-describedby={`${id}-error`}
        {...props}
      />
    </Wrapper>
  );
}
