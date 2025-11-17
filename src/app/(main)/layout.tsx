import { type PropsWithChildren } from "react";
import { Footer } from "@/components/core";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="pb-23">{children}</div>
      <Footer />
    </>
  );
}
