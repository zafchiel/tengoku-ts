"use client";

import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function GlobalProviders({ children }: { children: ReactNode }) {
  return (
    <>
      <TooltipProvider>
        {children}
        <Toaster
          richColors
          toastOptions={{
            duration: 3000,
          }}
        />
      </TooltipProvider>
    </>
  );
}
