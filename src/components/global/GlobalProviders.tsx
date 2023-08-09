"use client"

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import { Toaster } from "../ui/toaster"

export default function GlobalProviders({ children }: { children: ReactNode }) {
  return (
    <>
      <SessionProvider>
        {children}
        <Toaster />
      </SessionProvider>
    </>
  )
}
