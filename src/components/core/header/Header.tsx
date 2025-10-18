import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";

export const NAV_ITEMS = [
  { href: "/login", label: "Sign In", intent: "inline" },
  { href: "/register", label: "Sign Up", intent: "primary" },
] as const;

export function Header() {
  return (
    <header className="fixed top-5 left-1/2 flex h-14 w-98 -translate-x-1/2 items-center justify-between rounded-2xl bg-white/70 pr-2 pl-5 backdrop-blur-md">
      <Logo />
      <nav>
        <ul className="flex gap-4">
          {NAV_ITEMS.map(({ href, label, intent }) => (
            <li key={href}>
              <Link href={href} className="focus:outline-0">
                <Button intent={intent}>{label}</Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
