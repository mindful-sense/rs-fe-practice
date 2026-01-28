export function AuthFieldError({
  errorId,
  error,
}: {
  errorId: string;
  error?: string;
}) {
  if (!error) return null;
  return (
    <p id={errorId} role="alert" className="text-danger min-h-5 text-sm">
      {error}
    </p>
  );
}
