"use client";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";

export default function LoginButton() {
  return (
    <Button
      onClick={async () =>
        await authClient.signIn.social({
          provider: "google",
          callbackURL: "/user",
        })
      }
    >
      Google better-auth
    </Button>
  );
}
