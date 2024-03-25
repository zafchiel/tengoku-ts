"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import useScrollDirection from "@/hooks/useScrollDirection";
import { Home } from "lucide-react";
import SearchDialog from "./searchDialog";
import { useContext } from "react";
import { UserInfoContext } from "../providers/user-info-provider";
import { Skeleton } from "./skeleton";
import { buttonVariants } from "./button";

function Header() {
  const { userInfo, isAuthenticating } = useContext(UserInfoContext);
  const direction = useScrollDirection();


  return (
    <header
      className={cn(
        "fixed inset-x-0 md:top-0 bottom-0 z-30 flex h-14 items-center justify-between p-5 bg-gradient-to-b from-transparent to-transparent backdrop-blur-sm transition-all duration-500",
        {
          "md:-top-14 -bottom-14": direction === "down",
        }
      )}
    >
      <div>
        <Link href="/">
          <h1 className=" text-xl md:text-4xl font-bold hidden md:block">
            TENGOKU
          </h1>
          <Home className="md:hidden" />
        </Link>
      </div>

      <div className="flex gap-4">
        <SearchDialog />

        {isAuthenticating ? (
          <Skeleton className="w-14" />
        ) : userInfo ? (
          <Link href="/user" className={cn(buttonVariants({variant: "secondary"}))}>Profile</Link>
        ) : (
          <Link href="/login" className={cn(buttonVariants({variant: "secondary"}))}>Login</Link>
        )}
      </div>
    </header>
  );
}

export default Header;
