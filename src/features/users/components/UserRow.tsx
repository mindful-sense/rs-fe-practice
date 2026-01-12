"use client";

import { useState } from "react";
import {
  faCaretDown,
  faFloppyDisk,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  type RoleId,
  type RoleName,
  type TableUser,
  ROLES,
  ROLE_NAMES,
  truncateMiddle,
} from "@/lib/shared";
import { removeUser, saveChanges } from "../lib/actions";

export function UserRow({
  userId,
  login,
  roleId,
  registeredAt,
  updatedAt,
  isDropdownOpen,
  onOpenDropdown,
  onCloseDropdown,
}: TableUser & {
  isDropdownOpen: boolean;
  onOpenDropdown: (value: string) => void;
  onCloseDropdown: () => void;
}) {
  const [currentRole, setCurrentRole] = useState({
    id: roleId,
    name: ROLE_NAMES[roleId],
  });

  const onChangeRole = (role: { id: RoleId; name: RoleName }): void => {
    setCurrentRole(role);
    onCloseDropdown();
  };

  const onToggleDropdown = (): void => {
    if (isDropdownOpen) onCloseDropdown();
    else onOpenDropdown(userId);
  };

  return (
    <tr className="relative after:absolute after:right-5 after:bottom-0 after:left-5 after:h-px after:bg-neutral-100 last:after:hidden">
      <td scope="row" className="px-5 py-4 whitespace-nowrap">
        {truncateMiddle({ text: login, maxLength: 18 })}
      </td>
      <td className="px-5 py-4">{updatedAt}</td>
      <td className="px-5 py-4">{registeredAt}</td>

      <td className="px-5 py-4">
        <div
          className="w-28z-20 relative"
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) onCloseDropdown();
          }}
        >
          <button
            type="button"
            onClick={onToggleDropdown}
            className="focus:outline-accent flex w-full cursor-pointer items-center justify-between rounded-lg border border-black py-1 pr-1 pl-2 outline-2 outline-offset-2 outline-transparent transition-colors duration-300"
          >
            {currentRole.name}
            <FontAwesomeIcon icon={faCaretDown} />
          </button>

          {isDropdownOpen && (
            <ul className="bg-elembg absolute z-20 mt-2 w-full overflow-hidden rounded-lg border border-black py-1 transition-all duration-300">
              {ROLE_NAMES.filter(
                (role) => role !== ROLE_NAMES[ROLES.GUEST],
              ).map((role, index) => (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() =>
                      onChangeRole({ id: index as RoleId, name: role })
                    }
                    className="hover:bg-accent-light focus:bg-accent-light w-full cursor-pointer px-2 py-1 text-left transition-colors duration-300 outline-none"
                  >
                    {role}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </td>

      <td className="px-5 py-4">
        <div className="flex justify-between">
          <button
            type="button"
            disabled={currentRole.id === roleId}
            onClick={() => saveChanges(userId, currentRole.id)}
            className="focus:outline-accent disabled:text-accent-disabled size-6 cursor-pointer rounded-sm outline-2 outline-offset-2 outline-transparent transition-colors duration-300 disabled:cursor-not-allowed"
          >
            <FontAwesomeIcon icon={faFloppyDisk} />
          </button>
          <button
            type="button"
            onClick={() => removeUser(userId)}
            className="focus:outline-danger-100 text-danger-100 size-6 cursor-pointer rounded-sm outline-2 outline-offset-2 outline-transparent transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </td>
    </tr>
  );
}
