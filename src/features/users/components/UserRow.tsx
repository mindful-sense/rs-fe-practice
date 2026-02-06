"use client";

import type { RoleId, RoleName, TableUser } from "@/lib/shared";

import { useState } from "react";
import {
  faCaretDown,
  faFloppyDisk,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ChipButton } from "@/components/ui";
import { ROLES, ROLE_NAMES, truncateMiddle } from "@/lib/shared";
import { removeUser, saveUserChanges } from "../lib/actions";

interface Props extends TableUser {
  isDropdownOpen: boolean;
  onOpenDropdown: (value: string) => void;
  onCloseDropdown: () => void;
}

export function UserRow({
  userId,
  login,
  roleId,
  registeredAt,
  updatedAt,
  isDropdownOpen,
  onOpenDropdown,
  onCloseDropdown,
}: Props) {
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
      <td scope="row" className="px-5 py-3 whitespace-nowrap">
        {truncateMiddle({ text: login, maxLength: 18 })}
      </td>
      <td className="px-5 py-3">{updatedAt}</td>
      <td className="px-5 py-3">{registeredAt}</td>

      <td className="px-5 py-3">
        <div
          className="relative w-full"
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) onCloseDropdown();
          }}
        >
          <button
            type="button"
            onClick={onToggleDropdown}
            className="focus:outline-accent flex w-full cursor-pointer items-center justify-between rounded-lg border border-neutral-100 py-2 pr-2 pl-3 outline-2 outline-offset-2 outline-transparent transition-colors duration-300 hover:border-neutral-200 focus:border-neutral-200"
          >
            {currentRole.name}
            <FontAwesomeIcon
              icon={faCaretDown}
              className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          <ul
            className={`absolute left-1/2 z-10 mt-2 w-36 -translate-x-1/2 overflow-hidden rounded-lg border border-neutral-200 bg-white/50 p-1 backdrop-blur-sm transition-all duration-300 ${isDropdownOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}
          >
            {ROLE_NAMES.filter((role) => role !== ROLE_NAMES[ROLES.GUEST]).map(
              (role, index) => (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() =>
                      onChangeRole({ id: index as RoleId, name: role })
                    }
                    className="hover:border-accent focus:border-accent w-full cursor-pointer rounded-md border-2 border-transparent px-2 py-1 text-left transition-colors duration-300 outline-none"
                  >
                    {role}
                  </button>
                </li>
              ),
            )}
          </ul>
        </div>
      </td>

      <td className="px-5 py-3">
        <div className="flex justify-between">
          <ChipButton
            border="none"
            rounded="semi"
            icon={faFloppyDisk}
            disabled={currentRole.id === roleId}
            onClick={() => saveUserChanges(userId, currentRole.id)}
          />
          <ChipButton
            border="none"
            rounded="semi"
            color="danger"
            icon={faTrash}
            onClick={() => removeUser(userId)}
          />
        </div>
      </td>
    </tr>
  );
}
