import GlobalProviders from "@/components/global/GlobalProviders";
import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/ui/header";
import { Analytics } from '@vercel/analytics/react'

const nohemi = localFont({
  src: "./fonts/Nohemi-VF.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tengoku - anime web app",
  description: "",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={nohemi.className}>
        <GlobalProviders>
          <Header />
          {children}
        </GlobalProviders>
          <Analytics />
      </body>
    </html>
  );
}
