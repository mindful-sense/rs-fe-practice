import { faFloppyDisk, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, H2 } from "@/components/ui";
import { ROLE_NAMES, toTitleCase, truncateMiddle } from "@/lib/shared";

export default function Users() {
  const users = [
    {
      id: "a",
      login: "john_doe",
      roleId: 0,
      registeredAt: "2025-07-01",
      updatedAt: "2025-07-01",
    },
    {
      id: "b",
      login: "qwdqwdadawdsadawaw",
      roleId: 1,
      registeredAt: "2025-10-21",
      updatedAt: "2025-11-30",
    },
    {
      id: "c",
      login: "test",
      roleId: 2,
      registeredAt: "2025-09-15",
      updatedAt: "2025-12-31",
    },
    {
      id: "4",
      login: "user_vova",
      roleId: 2,
      registeredAt: "2025-03-12",
      updatedAt: "2025-04-05",
    },
    {
      id: "5",
      login: "sergey_dev",
      roleId: 1,
      registeredAt: "2025-04-20",
      updatedAt: "2025-05-01",
    },
    {
      id: "6",
      login: "kate_rock",
      roleId: 2,
      registeredAt: "2025-05-05",
      updatedAt: "2025-05-10",
    },
    {
      id: "7",
      login: "denis_pro",
      roleId: 0,
      registeredAt: "2025-05-22",
      updatedAt: "2025-05-22",
    },
    {
      id: "8",
      login: "lisa_m",
      roleId: 1,
      registeredAt: "2025-06-01",
      updatedAt: "2025-06-15",
    },
    {
      id: "9",
      login: "ivan_ivanov",
      roleId: 2,
      registeredAt: "2025-06-10",
      updatedAt: "2025-06-12",
    },
    {
      id: "10",
      login: "tech_lead",
      roleId: 0,
      registeredAt: "2025-07-05",
      updatedAt: "2025-07-05",
    },
    {
      id: "11",
      login: "guest_99",
      roleId: 2,
      registeredAt: "2025-07-15",
      updatedAt: "2025-07-20",
    },
    {
      id: "12",
      login: "olga_art",
      roleId: 1,
      registeredAt: "2025-08-01",
      updatedAt: "2025-08-10",
    },
    {
      id: "13",
      login: "max_power",
      roleId: 0,
      registeredAt: "2025-08-20",
      updatedAt: "2025-08-25",
    },
    {
      id: "14",
      login: "dmitry_k",
      roleId: 1,
      registeredAt: "2025-09-05",
      updatedAt: "2025-09-05",
    },
    {
      id: "15",
      login: "anna_joy",
      roleId: 2,
      registeredAt: "2025-09-18",
      updatedAt: "2025-09-30",
    },
    {
      id: "16",
      login: "boris_t",
      roleId: 0,
      registeredAt: "2025-10-02",
      updatedAt: "2025-10-05",
    },
    {
      id: "17",
      login: "elena_w",
      roleId: 1,
      registeredAt: "2025-11-11",
      updatedAt: "2025-11-11",
    },
    {
      id: "18",
      login: "pavel_88",
      roleId: 2,
      registeredAt: "2025-11-25",
      updatedAt: "2025-12-01",
    },
    {
      id: "19",
      login: "igor_dev",
      roleId: 0,
      registeredAt: "2025-12-05",
      updatedAt: "2025-12-10",
    },
    {
      id: "20",
      login: "nina_sky",
      roleId: 1,
      registeredAt: "2025-12-20",
      updatedAt: "2025-12-25",
    },
  ];

  return (
    <>
      <H2 className="my-5">Users</H2>

      <main className="mx-auto w-202 rounded-3xl bg-white/70 p-6 backdrop-blur-md">
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
            {users.map(({ id, login, roleId, registeredAt, updatedAt }) => (
              <tr
                key={id}
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
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}
