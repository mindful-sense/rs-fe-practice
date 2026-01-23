import { H2 } from "@/components/ui";
import { UserTable } from "@/features/users/client";
import { getErrorMessage, selectUsers } from "@/lib/server";
import { type TableUser } from "@/lib/shared";

export default function Users() {
  let users: TableUser[] | null = null;
  let message: string | null = null;

  try {
    users = selectUsers();
  } catch (error) {
    console.error(error);
    message = getErrorMessage(error);
  }

  return (
    <>
      <H2 className="mt-8 mb-10">User Management Table</H2>

      <main className="bg-elembg relative mx-auto mb-24 w-4xl rounded-3xl p-6">
        {users ? (
          <UserTable users={users} />
        ) : (
          <p className="text-center">{message}</p>
        )}
      </main>
    </>
  );
}
