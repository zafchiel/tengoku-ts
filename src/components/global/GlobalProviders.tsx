"use client"

import { ReactNode } from "react"
import { Toaster } from "../ui/toaster"

export default function GlobalProviders({ children }: { children: ReactNode }) {
  return (
    <>
        {children}
        <Toaster />
    </>
  )
}
