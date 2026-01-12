"use client";

import { useState } from "react";
import {
  faCaretDown,
  faFloppyDisk,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  type RoleNames,
  type TableUser,
  ROLE_NAMES,
  truncateMiddle,
} from "@/lib/shared";

export function UserRow({
  userId,
  login,
  roleId,
  registeredAt,
  updatedAt,
  isDropdownOpen,
  openDropdown,
  closeDropdown,
}: TableUser & {
  isDropdownOpen: boolean;
  openDropdown: (value: string) => void;
  closeDropdown: () => void;
}) {
  const [currentRole, setCurrentRole] = useState(ROLE_NAMES[roleId]);

  const changeRole = (newRole: RoleNames) => {
    setCurrentRole(newRole);
    closeDropdown();
  };

  const toggleDropdown = () => {
    if (isDropdownOpen) closeDropdown();
    else openDropdown(userId);
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
          className="relative w-28"
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) closeDropdown();
          }}
        >
          <button
            type="button"
            onClick={toggleDropdown}
            className="focus:outline-accent flex w-full cursor-pointer items-center justify-between rounded-lg border border-black py-1 pr-1 pl-2 outline-2 outline-offset-2 outline-transparent transition-colors duration-300"
          >
            {currentRole}
            <FontAwesomeIcon icon={faCaretDown} />
          </button>

          {isDropdownOpen && (
            <ul className="bg-elembg absolute z-10 mt-2 w-full overflow-hidden rounded-lg border border-black py-1 transition-all duration-300">
              {ROLE_NAMES.map((role, index) => (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => changeRole(role)}
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
            className="focus:outline-accent size-6 cursor-pointer rounded-sm outline-2 outline-offset-2 outline-transparent transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faFloppyDisk} />
          </button>
          <button
            type="button"
            className="focus:outline-danger-100 text-danger-100 size-6 cursor-pointer rounded-sm outline-2 outline-offset-2 outline-transparent transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </td>
    </tr>
  );
}
