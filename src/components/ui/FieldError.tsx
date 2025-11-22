interface Props {
  errorId: string;
  error?: string;
}

export function FieldError({ errorId, error }: Props) {
  if (!error) return null;
  return (
    <p id={errorId} role="alert" className="text-danger-100 min-h-5 text-sm">
      {error}
    </p>
  );
}
