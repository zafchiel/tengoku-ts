import GlobalProviders from "@/components/providers/global-providers";
import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/ui/header";

const nohemi = localFont({
  src: "./fonts/Nohemi-VF.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tengoku - anime web app",
  description: "",
  manifest: "/manifest.json",
};

export default async function RootLayout({
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
      </body>
    </html>
  );
}
