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
    message = getErrorMessage(error);
  }

  return (
    <div className="pb-15">
      <H2 className="my-5">Users</H2>

      <main className="relative mx-auto w-202 rounded-3xl bg-white/70 p-6 backdrop-blur-md">
        {users ? (
          <UserTable users={users} />
        ) : (
          <p className="text-center">{message}</p>
        )}
      </main>
    </div>
  );
}
