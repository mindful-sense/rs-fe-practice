import { type Metadata } from "next";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import { Header } from "@/components/core";
import { StoreProvider } from "@/lib/redux";
import { hostGrotesk } from "./_ui/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "devlog",
  description: "A blog about the web development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${hostGrotesk.className} bg-page min-h-screen font-medium antialiased`}
      >
        <Header />
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
