"use client";

import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { logoutAction } from "@/lib/server/actions/auth-actions";
import { useContext } from "react";
import { UserInfoContext } from "../providers/user-info-provider";

function SubmitButton() {
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


export function LogoutForm() {
  return (
    <form action={logoutAction}>
      <SubmitButton />
    </form>
  );
}
