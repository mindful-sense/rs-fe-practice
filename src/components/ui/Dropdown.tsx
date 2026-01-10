import { type ComponentProps } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export function Dropdown({
  // list,
  children,
}: ComponentProps<"button"> & { list?: string[] }) {
  return (
    <div>
      <button
        type="button"
        className="flex w-28 cursor-pointer items-center justify-between rounded-lg border border-black py-1 pr-1 pl-2"
      >
        {children}
        <FontAwesomeIcon icon={faCaretDown} />
      </button>
      {/* <div>
        <ul>
          {list.map((role, index) => (
            <li key={index}>{role}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}
