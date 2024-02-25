"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import useScrollDirection from "@/hooks/useScrollDirection";
import ProfileButton from "./profileButton";
import { Home, Newspaper } from "lucide-react";
import SearchDialog from "./searchDialog";

function Header() {
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

      <div className="flex gap-3">
        <ProfileButton />

        <nav className="flex items-center justify-around gap-1 text-xl font-medium">
          <Link href={"/feed"}>
            <Newspaper />
          </Link>
          <SearchDialog />
        </nav>
      </div>
    </header>
  );
}

export default Header;
