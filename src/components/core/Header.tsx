"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  faCircleLeft,
  faCode,
  faFile,
  faRightFromBracket,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button, LinkButton } from "@/components/ui";
import { signout } from "@/features/auth/shared";
import { selectLogin, selectRoleId, useAppSelector } from "@/lib/client";
import {
  ROLES,
  ROUTE_PATHS,
  isAuthRoutePath,
  truncateMiddle,
} from "@/lib/shared";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const userLogin = useAppSelector(selectLogin);
  const userRoleId = useAppSelector(selectRoleId);

  const isAuthPage = isAuthRoutePath(pathname);
  const isHome = pathname === ROUTE_PATHS.HOME;
  const isAdmin = userRoleId === ROLES.ADMIN;

  return (
    <header className="fixed top-2 left-1/2 z-50 flex h-14 w-max -translate-x-1/2 justify-center gap-1 whitespace-nowrap">
      {!isHome && (
        <button
          type="button"
          onClick={router.back}
          className="hover:text-accent focus:text-accent flex w-24 grow cursor-pointer items-center justify-center gap-1 rounded-2xl border border-neutral-50 bg-white/70 backdrop-blur-sm transition-colors duration-300 outline-none"
        >
          <FontAwesomeIcon icon={faCircleLeft} />
          <strong className="text-sm font-medium">Back</strong>
        </button>
      )}

      <div className="flex max-w-xl items-center justify-between gap-20 rounded-2xl border border-neutral-50 bg-white/70 px-4 backdrop-blur-sm">
        <Link
          href="/"
          aria-label="devlog home logo"
          className="hover:text-accent focus:text-accent transition-colors duration-300 outline-none"
        >
          <FontAwesomeIcon icon={faCode} size="lg" className="mr-1" />
          <strong className="text-xl/tight font-extrabold tracking-tight">
            devlog
          </strong>
        </Link>

        {!isAuthPage && (
          <div className="flex items-center gap-4">
            {userLogin ? (
              <>
                {isAdmin && (
                  <div className="flex items-center gap-2 border-r border-neutral-100 pr-4">
                    <LinkButton
                      href={ROUTE_PATHS.USERS}
                      intent="secondary"
                      leftIcon={faUsers}
                    >
                      View Users
                    </LinkButton>

                    <LinkButton
                      href={ROUTE_PATHS.POST}
                      intent="secondary"
                      leftIcon={faFile}
                      iconstyles="-mx-1"
                    >
                      Post
                    </LinkButton>
                  </div>
                )}

                <Button
                  onClick={() => signout()}
                  intent="inline"
                  rightIcon={faRightFromBracket}
                >
                  {truncateMiddle({
                    text: userLogin,
                    maxLength: isAdmin ? undefined : 20,
                  })}
                </Button>
              </>
            ) : (
              <div className="-mr-2 flex items-center gap-4">
                <LinkButton href={ROUTE_PATHS.LOGIN} intent="inline">
                  Sign In
                </LinkButton>

                <LinkButton href={ROUTE_PATHS.REGISTER} intent="primary">
                  Sign Up
                </LinkButton>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
