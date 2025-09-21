import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import "./globals.css";

config.autoAddCss = false;

const hostGrotesk = Host_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "devlog",
  description: "A blog about the web development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${hostGrotesk.className} antialiased`}>{children}</body>
    </html>
  );
}
