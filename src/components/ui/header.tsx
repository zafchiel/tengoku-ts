"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import useScrollDirection from "@/hooks/use-scroll-direction";
import { Home } from "lucide-react";
import SearchDialog from "./search-dialog";
import { Skeleton } from "./skeleton";
import { buttonVariants } from "./button";
import useUser from "@/hooks/use-user";

function Header() {
  const { user, isAuthenticating, error } = useUser();
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
        <Link href="/" aria-label="Home Page">
          <h1 className=" text-xl md:text-4xl font-bold hidden md:block">
            TENGOKU
          </h1>
          <Home className="md:hidden" />
        </Link>
      </div>

      <div className="flex gap-4">
        <SearchDialog />

        {isAuthenticating ? (
          <Skeleton className="w-14 h-10" />
        ) : user ? (
          <Link
            href="/user"
            className={cn(buttonVariants({ variant: "secondary" }))}
          >
            Profile
          </Link>
        ) : (
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "secondary" }))}
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
