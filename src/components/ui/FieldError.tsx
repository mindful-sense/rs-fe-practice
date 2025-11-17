import { type ErrorField } from "@/features/auth/shared";

interface Props {
  errorId: string;
  serverError?: ErrorField;
  clientError?: ErrorField;
}

export function FieldError({ errorId, serverError, clientError }: Props) {
  const error = clientError ?? serverError;

  if (!error) {
    return null;
  }

  return (
    <p id={errorId} role="alert" className="text-danger-100 min-h-5 text-sm">
      {error.message}
    </p>
  );
}
