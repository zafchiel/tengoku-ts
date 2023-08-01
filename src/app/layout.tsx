import Header from "@/components/ui/header"
import "./globals.css"
import type { Metadata } from "next"
import localFont from "next/font/local"

const nohemi = localFont({
  src: "./fonts/Nohemi-VF.ttf",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Tengoku - anime web app",
  description: "",
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={nohemi.className}>{children}</body>
    </html>
  )
}
