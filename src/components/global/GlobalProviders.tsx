"use client";

import { ReactNode } from "react";
import { Toaster } from "../ui/toaster";
import { TopAiringContextProvider } from "./top-airing-context";

export default function GlobalProviders({ children }: { children: ReactNode }) {
  return (
    <>
      <TopAiringContextProvider>
        {children}
        <Toaster />
      </TopAiringContextProvider>
    </>
  );
}
