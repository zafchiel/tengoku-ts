"use client";

import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { logoutAction } from "@/lib/server/actions/auth-actions";
import { useContext } from "react";
import { UserInfoContext } from "../providers/user-info-provider";

function SubmitButton() {
  const status = useFormStatus();

  return (
    <Button
      variant="destructive"
      aria-disabled={status.pending}
      disabled={status.pending}
      loading={status.pending}
      className="uppercase tracking-wider"
    >
      Sign Out
    </Button>
  );
}


export function LogoutForm() {
  const { cleanUserInfo } = useContext(UserInfoContext);

  return (
    <form action={async () => {
      await logoutAction();
      cleanUserInfo();
    }}>
      <SubmitButton />
    </form>
  );
}
