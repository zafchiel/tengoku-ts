"use client";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";

export default function LoginButton() {
  return (
    <Button
      onClick={() =>
        authClient.signIn.social({
          provider: "google",
        })
      }
    >
      Google better-auth
    </Button>
  );
}
