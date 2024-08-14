"use client";

import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { logoutAction } from "@/lib/server/actions/auth-actions";
import useUser from "@/hooks/use-user";

function SubmitButton() {
  const status = useFormStatus();

  return (
    <Button
      variant="destructive"
      aria-disabled={status.pending}
      disabled={status.pending}
      loading={status.pending}
      className="uppercase tracking-wider rounded-full"
    >
      Logout
    </Button>
  );
}

export function LogoutForm() {
  const { mutate } = useUser();

  return (
    <form
      action={async () => {
        await logoutAction();
        mutate(undefined);
      }}
    >
      <SubmitButton />
    </form>
  );
}
