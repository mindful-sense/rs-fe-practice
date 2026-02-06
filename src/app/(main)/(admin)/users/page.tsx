import { H2 } from "@/components/ui";
import { UserTable } from "@/features/users/client";
import { getUsers } from "@/features/users/server";

export default function Users() {
  const result = getUsers();

  return (
    <>
      <H2>User Management Table</H2>

      <main className="bg-elembg relative mx-auto mb-24 w-4xl rounded-3xl p-6">
        {"error" in result ? (
          <p className="text-center">{result.error}</p>
        ) : (
          <UserTable users={result} />
        )}
      </main>
    </>
  );
}
