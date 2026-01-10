import { type Metadata } from "next";
import { type ReactNode } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { Header } from "@/components/core";
import { SessionRefresher } from "@/features/auth/client";
import { getCurrentUser } from "@/features/auth/server";
import { StoreProvider } from "@/lib/client";

import { hostGrotesk } from "./_ui/fonts";
import "./globals.css";

config.autoAddCss = false;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "devlog",
  description: "A blog about the web development",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body
        className={`${hostGrotesk.className} bg-page font-medium antialiased`}
      >
        <SessionRefresher />
        <StoreProvider user={user}>
          <Header />
          <div className="grid min-h-[calc(100vh-68px)] pt-17">{children}</div>
        </StoreProvider>
      </body>
    </html>
  );
}
