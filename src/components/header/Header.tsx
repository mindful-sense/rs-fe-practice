import Link from "next/link";
import { Button } from "@/components/Button";
import { NAV_ITEMS } from "./constants";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="fixed top-5 left-1/2 flex h-14 w-98 -translate-x-1/2 items-center justify-between rounded-2xl bg-white/70 pr-2 pl-5 backdrop-blur-md">
      <Logo />
      <nav>
        <ul className="flex gap-4">
          {NAV_ITEMS.map((page) => (
            <li key={page.href}>
              <Link href={page.href}>
                <Button intent={page.intent}>{page.label}</Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
