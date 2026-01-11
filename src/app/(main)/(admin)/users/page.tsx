import { faFloppyDisk, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, H2 } from "@/components/ui";
import { getUsers } from "@/features/users/server";
import { ROLE_NAMES, toTitleCase, truncateMiddle } from "@/lib/shared";

export default function Users() {
  const { users, message } = getUsers();

  return (
    <>
      <H2 className="my-5">Users</H2>

      <main className="mx-auto w-202 rounded-3xl bg-white/70 p-6 backdrop-blur-md">
        {users ? (
          <table className="w-full table-fixed text-sm">
            <thead>
              <tr className="bg-neutral-100 text-left">
                <th scope="col" className="w-52 rounded-s-xl px-5 py-3">
                  Username
                </th>
                <th scope="col" className="w-full px-5 py-3">
                  Updated
                </th>
                <th scope="col" className="w-full px-5 py-3">
                  Registered
                </th>
                <th scope="col" className="w-full px-5 py-3">
                  Role
                </th>
                <th scope="col" className="w-11 py-3 pl-5">
                  <span className="sr-only">Save</span>
                </th>
                <th scope="col" className="w-11 rounded-e-xl py-3 pr-5">
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map(
                ({ userId, login, roleId, registeredAt, updatedAt }) => (
                  <tr
                    key={userId}
                    className="relative after:absolute after:right-5 after:bottom-0 after:left-5 after:h-px after:bg-neutral-100 last:after:hidden"
                  >
                    <td scope="row" className="px-5 py-4 whitespace-nowrap">
                      {truncateMiddle({ text: login, maxLength: 18 })}
                    </td>
                    <td className="px-5 py-4">{updatedAt}</td>
                    <td className="px-5 py-4">{registeredAt}</td>
                    <td className="px-5 py-4">
                      <Dropdown>{toTitleCase(ROLE_NAMES[roleId])}</Dropdown>
                    </td>
                    <td className="py-4 pl-5">
                      <FontAwesomeIcon icon={faFloppyDisk} />
                    </td>
                    <td className="py-4 pr-5 text-right">
                      <FontAwesomeIcon icon={faTrash} />
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        ) : (
          <p className="text-center">{message}</p>
        )}
      </main>
    </>
  );
}
