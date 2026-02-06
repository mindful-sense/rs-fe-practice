export function FormError({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <p
      role="alert"
      className="bg-danger flex min-h-16 items-center justify-center rounded-2xl p-3 text-center text-white"
    >
      {error}
    </p>
  );
}
