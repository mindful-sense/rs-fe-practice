import { type Metadata } from "next";
import { type ReactNode } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { Header } from "@/components/core";
import { SessionRefresher } from "@/features/auth/client";

import { hostGrotesk } from "./_ui/fonts";
import "./globals.css";

config.autoAddCss = false;

export const metadata: Metadata = {
  title: "devlog",
  description: "A blog about the web development",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${hostGrotesk.className} bg-page font-medium antialiased`}
      >
        <SessionRefresher />
        <Header />
        <div className="mt-18 grid min-h-[calc(100vh-72px)] py-4">
          {children}
        </div>
      </body>
    </html>
  );
}
