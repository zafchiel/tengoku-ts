"use client";
import { Button } from "../ui/button";
import { createAuthClient } from "better-auth/react";

export default function LoginButton() {
  const authClient = createAuthClient();

  return (
    <Button
      onClick={() =>
        authClient.signIn.social({
          provider: "google",
        })
      }
    >
      Github better-auth
    </Button>
  );
}
