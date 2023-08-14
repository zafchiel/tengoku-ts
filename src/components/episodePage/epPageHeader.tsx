"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { Suspense } from "react";
import SearchBar from "../ui/search";
import useScrollDirection from "@/hooks/useScrollDirection";
import ProfileButton from "../ui/profileButton";
import { Skeleton } from "@/components/ui/skeleton";

export default function EpPageHeader() {
  const direction = useScrollDirection();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between p-5 bg-gradient-to-b from-transparent to-transparent backdrop-blur-sm transition-all duration-500",
        {
          "md:-top-14": direction === "down",
        }
      )}
    >
      <div>
        <Link href="/">
          <h1 className=" text-xl md:text-4xl font-bold ">TENGOKU</h1>
        </Link>
      </div>

      <div className="flex gap-2">
        <Suspense fallback={<Skeleton className="h-full w-10" />}>
          <ProfileButton />
        </Suspense>
        <nav className="flex items-center justify-around gap-3 text-xl font-medium text-white/75">
          <SearchBar />
        </nav>
      </div>
    </header>
  );
}
