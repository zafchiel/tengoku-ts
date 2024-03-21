"use client";

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { User } from "lucia";
import { useFormStatus } from "react-dom";
import { logoutAction } from "@/lib/server/actions/auth-actions";
import { useContext } from "react";
import { UserInfoContext } from "../providers/user-info-provider";

function Submit() {
  const status = useFormStatus();
  const { cleanUserInfo } = useContext(UserInfoContext);

  return (
    <Button
      variant="destructive"
      aria-disabled={status.pending}
      disabled={status.pending}
      loading={status.pending}
      onClick={() => cleanUserInfo()}
      className="uppercase tracking-wider"
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
