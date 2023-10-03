"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button, buttonVariants } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import Link from "next/link";
import { PopoverContent, Popover, PopoverTrigger } from "./popover";
import { Separator } from "@radix-ui/react-select";
import { Skeleton } from "./skeleton";

export default function ProfileButton() {
  const { data: session, status } = useSession();

  if (status === "loading") return <Skeleton className="h-9 w-20" />;

  if (session) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Avatar className="cursor-pointer shadow-md">
            {session.user?.image && (
              <AvatarImage src={session.user?.image} alt="Profile image" />
            )}
            <AvatarFallback>
              {session.user?.name?.slice(0, 2) ??
                session.user?.email?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-fit">
          <div className="flex flex-col gap-2 items-center justify-center">
            <Link
              href="/user"
              className={buttonVariants({ size: "sm", className: "w-full" })}
            >
              Profile
            </Link>
            <Separator />
            <Button
              variant="outline"
              size="sm"
              onClick={() => signOut()}
              className="w-full"
            >
              Sign out
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  }
  return (
    <div>
      <Button variant="secondary" size="sm" onClick={() => signIn()}>
        Sign in
      </Button>
    </div>
  );
}
