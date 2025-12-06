import { Back, HeaderActions } from "./components/client";
import { Logo } from "./components/shared";

export function Header() {
  return (
    <header className="fixed top-5 left-1/2 z-50 flex h-13 w-max -translate-x-1/2 justify-center gap-2 whitespace-nowrap">
      <Back />

      <div className="flex max-w-xl items-center justify-between gap-22 rounded-2xl bg-white/70 px-4 shadow-xs shadow-black/3 backdrop-blur-md">
        <Logo />
        <HeaderActions />
      </div>
    </header>
  );
}
