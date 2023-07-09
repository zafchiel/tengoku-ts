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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={nohemi.className}>
        <main className="container mt-14">{children}</main>
      </body>
    </html>
  )
}
