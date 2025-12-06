"use client";

import { usePathname } from "next/navigation";
import {
  faFile,
  faUsers,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { ROUTE_PATHS, isAuthRoutePath } from "@/config";
import { truncateMiddle } from "@/lib/shared";
import { LinkButton, VerticalDivider } from "@/components/ui";

export function HeaderActions() {
  const pathname = usePathname();
  if (isAuthRoutePath(pathname)) return null;

  const showAdmin = false;
  const username = "usernameqwert";

  return (
    <nav className="flex gap-4">
      {showAdmin ? (
        <>
          <ul className="flex items-center gap-2">
            <li>
              <LinkButton
                href={ROUTE_PATHS.USERS}
                intent="secondary"
                leftIcon={faUsers}
              >
                View Users
              </LinkButton>
            </li>
            <li>
              <LinkButton
                href={ROUTE_PATHS.POST}
                intent="secondary"
                leftIcon={faFile}
                iconstyles="-mx-1"
              >
                Post
              </LinkButton>
            </li>
          </ul>

          <VerticalDivider />

          <LinkButton
            href={ROUTE_PATHS.LOGIN}
            intent="inline"
            rightIcon={faRightFromBracket}
          >
            {truncateMiddle({ text: username })}
          </LinkButton>
        </>
      ) : (
        <ul className="-mr-2 flex items-center gap-4">
          <li>
            <LinkButton href={ROUTE_PATHS.LOGIN} intent="inline">
              Sign In
            </LinkButton>
          </li>
          <li>
            <LinkButton href={ROUTE_PATHS.REGISTER} intent="primary">
              Sign Up
            </LinkButton>
          </li>
        </ul>
      )}
    </nav>
  );
}
