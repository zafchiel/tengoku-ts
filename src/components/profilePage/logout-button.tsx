"use client";

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { User } from "lucia";
import { useFormStatus } from "react-dom";
import { logoutAction } from "@/lib/server/actions/auth-actions";

function Submit() {
  const status = useFormStatus();

  return (
    <Button
      variant="destructive"
      aria-disabled={status.pending}
      disabled={status.pending}
    >
      Sign Out
    </Button>
  );
}

type LogoutButtonProps = {
  user: User;
};

export function LogoutButton({ user }: LogoutButtonProps) {
  return (
    <form action={logoutAction}>
      <Submit />
    </form>
  );
}
