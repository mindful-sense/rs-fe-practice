import { type Metadata } from "next";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import { Header } from "@/components/core";
import { StoreProvider, initialUserState } from "@/lib/shared";
import { SessionRefresher } from "@/features/auth/client";
import { readSession } from "@/features/auth/server";
import { hostGrotesk } from "./_ui/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "devlog",
  description: "A blog about the web development",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await readSession();
  const preloadedState = {
    user: (session ? session.user : null) ?? initialUserState,
  };

  return (
    <html lang="en">
      <body
        className={`${hostGrotesk.className} bg-page font-medium antialiased`}
      >
        <Header />
        <StoreProvider preloadedState={preloadedState}>
          <SessionRefresher>{children}</SessionRefresher>
        </StoreProvider>
      </body>
    </html>
  );
}
