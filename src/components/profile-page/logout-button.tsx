"use client";

import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  return (
    <Button
      variant="destructive"
      aria-disabled={pending}
      disabled={pending}
      loading={pending}
      className="uppercase tracking-wider rounded-full"
      onClick={async () => {
        setPending(true);
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              setPending(false);
              router.push("/login");
            },
          },
        });
      }}
    >
      Logout
    </Button>
  );
}
