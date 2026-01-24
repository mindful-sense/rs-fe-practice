"use client";

import { useState } from "react";
import { type TableUser } from "@/lib/shared";
import { UserRow } from "./UserRow";

export function UserTable({ users }: { users: TableUser[] }) {
  const [currentDropdown, setCurrentDropdown] = useState<string | null>(null);

  const handleOpenDropdown = (newId: string): void => setCurrentDropdown(newId);
  const handleCloseDropdown = (): void => setCurrentDropdown(null);

  return (
    <table className="w-full table-fixed text-sm">
      <thead>
        <tr className="sticky top-18 z-20 bg-neutral-50/70 text-left backdrop-blur-sm">
          <th scope="col" className="w-52 rounded-s-xl px-5 py-3">
            Username
          </th>
          <th scope="col" className="w-full px-5 py-3">
            Updated
          </th>
          <th scope="col" className="w-full px-5 py-3">
            Registered
          </th>
          <th scope="col" className="w-44 px-5 py-3">
            Role
          </th>
          <th scope="col" className="w-30 rounded-e-xl px-5 py-3">
            <span className="sr-only">Actions</span>
          </th>
        </tr>
      </thead>

      <tbody>
        {users.map(({ userId, login, roleId, registeredAt, updatedAt }) => (
          <UserRow
            key={userId}
            userId={userId}
            login={login}
            roleId={roleId}
            registeredAt={registeredAt}
            updatedAt={updatedAt}
            isDropdownOpen={userId === currentDropdown}
            onOpenDropdown={handleOpenDropdown}
            onCloseDropdown={handleCloseDropdown}
          />
        ))}
      </tbody>
    </table>
  );
}
