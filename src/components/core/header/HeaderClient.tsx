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
import {
  type UserSession,
  ROUTE_PATHS,
  isAuthRoutePath,
  truncateMiddle,
} from "@/lib/shared";

export function HeaderClient({ user }: { user: UserSession | null }) {
  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage = isAuthRoutePath(pathname);
  const isHome = pathname === ROUTE_PATHS.HOME;
  const isAdmin = user?.roleId === 1;

  return (
    <header className="fixed top-5 left-1/2 z-50 flex h-13 w-max -translate-x-1/2 justify-center gap-2 whitespace-nowrap">
      {!isHome && (
        <button
          type="button"
          onClick={router.back}
          className="hover:text-accent focus:text-accent flex w-23 grow cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white/70 shadow-xs shadow-black/3 outline-0 backdrop-blur-md transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faCircleLeft} />
          <strong className="text-sm font-medium">Back</strong>
        </button>
      )}

      <div className="flex max-w-xl items-center justify-between gap-22 rounded-2xl bg-white/70 px-4 shadow-xs shadow-black/3 backdrop-blur-md">
        <Link
          href="/"
          aria-label="devlog home logo"
          className="hover:text-accent focus:text-accent outline-0 transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faCode} size="lg" className="mr-1" />
          <strong className="text-xl/5 font-extrabold tracking-tight">
            devlog
          </strong>
        </Link>

        {!isAuthPage && (
          <div className="flex items-center gap-4">
            {user ? (
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
                    text: user.login,
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
