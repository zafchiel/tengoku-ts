"use client";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function EmailInput() {
  const [email, setEmail] = useState("");
  const params = useSearchParams();
  const callbackUrl = params?.get("callbackUrl");

  const handleSend = async () => {
    signIn("resend", { email, callbackUrl: callbackUrl ?? "/" });
  };
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor="email">Sign in with email</Label>
      <Input
        type="email"
        id="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={handleSend}>Send</Button>
    </div>
  );
}
