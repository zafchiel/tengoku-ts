"use client";

import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  return (
    <form
      action={async () => {
        await authClient.signOut();
        router.push("/login");
      }}
    >
      <SubmitButton />
    </form>
  );
}
