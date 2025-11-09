import { type ReactNode } from "react";
import { Footer } from "@/components/core";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="pb-23">{children}</div>
      <Footer />
    </>
  );
}
