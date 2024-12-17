"use client";

import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { authClient } from "@/lib/auth-client";

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
  return (
    <form
      action={async () => {
        await authClient.signOut();
      }}
    >
      <SubmitButton />
    </form>
  );
}
