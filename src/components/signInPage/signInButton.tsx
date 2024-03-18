"use client";

import { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { Button, ButtonProps } from "../ui/button";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

type Props = {
  provider: "google" | "reddit" | "discord";
  className: HTMLAttributes<HTMLButtonElement>["className"];
  children: ReactNode;
};

export default function SignInButton({ provider, className, children }: Props) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams!.get("callbackUrl");

  const handleClick = () => {
    // signIn(provider, { callbackUrl: callbackUrl ?? "/" });
  };

  return (
    <Button onClick={handleClick} className={cn(className)}>
      {children}
    </Button>
  );
}
