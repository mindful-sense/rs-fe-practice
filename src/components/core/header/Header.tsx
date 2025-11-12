import { ROUTE_PATHS } from "@/config";
import { Button } from "@/components/ui";
import { Back, Logo, NavButtons } from "./components";

const AUTH_NAV_ITEMS = [
  { href: ROUTE_PATHS.LOGIN, label: "Sign In", intent: "inline" },
  { href: ROUTE_PATHS.REGISTER, label: "Sign Up", intent: "primary" },
] as const;

export function Header() {
  return (
    <header className="fixed top-5 left-1/2 z-50 flex h-13 -translate-x-1/2 justify-center gap-2">
      <Back />

      <div className="flex items-center justify-between gap-37 rounded-2xl bg-white/70 px-4 shadow-xs shadow-black/3 backdrop-blur-md">
        <Logo />

        <NavButtons>
          {AUTH_NAV_ITEMS.map(({ href, label, intent }) => (
            <li key={href}>
              <Button href={href} intent={intent}>
                {label}
              </Button>
            </li>
          ))}
        </NavButtons>
      </div>
    </header>
  );
}
