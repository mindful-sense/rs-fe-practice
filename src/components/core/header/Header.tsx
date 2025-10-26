import { Button } from "@/components/ui";
import { Back } from "./Back";
import { Logo } from "./Logo";

const NAV_ITEMS = [
  { href: "/login", label: "Sign In", intent: "inline" },
  { href: "/register", label: "Sign Up", intent: "primary" },
] as const;

export function Header() {
  return (
    <header className="fixed top-5 left-1/2 flex h-14 w-124 -translate-x-1/2 justify-center gap-2">
      <Back />
      <div className="flex w-98 items-center justify-between rounded-2xl bg-white/70 pr-2 pl-5 backdrop-blur-md">
        <Logo />
        <nav>
          <ul className="flex gap-4">
            {NAV_ITEMS.map(({ href, label, intent }) => (
              <li key={href}>
                <Button href={href} intent={intent}>
                  {label}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
