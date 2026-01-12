import { H2 } from "@/components/ui";
import { UserTable } from "@/features/users/client";
import { selectUsers } from "@/lib/server";

export default function Users() {
  const { users, message } = selectUsers();

  return (
    <>
      <H2 className="my-5">Users</H2>

      <main className="mx-auto w-202 rounded-3xl bg-white/70 p-6 backdrop-blur-md">
        {users ? (
          <UserTable users={users} />
        ) : (
          <p className="text-center">{message}</p>
        )}
      </main>
    </>
  );
}
