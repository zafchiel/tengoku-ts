"use client";

import { ReactNode } from "react";
import { Toaster } from "../ui/toaster";
import { UserInfoProvier } from "./user-info-provider";

export default function GlobalProviders({ children }: { children: ReactNode }) {
  return (
    <>
      <UserInfoProvier>
        {children}
        <Toaster />
      </UserInfoProvier>
    </>
  );
}
