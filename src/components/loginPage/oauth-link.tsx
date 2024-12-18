"use client";

import { createElement, type JSX } from "react";
import { authClient } from "@/lib/auth-client";

export type IconProps = {
  size?: number;
  className?: string;
  color?: string;
};

type Icon = (props: IconProps) => JSX.Element;

type OAuthLinkProps = {
  icon: Icon;
  providerName: string;
  providerLink?: string;
};

export function OAuthLink({ icon, providerName }: OAuthLinkProps) {
  return (
    <button
      onClick={async () => {
        await authClient.signIn.social({
          provider: providerName as "github" | "google",
          callbackURL: "/user",
        });
      }}
      className="relative overflow-hidden border rounded-md hover:border-primary/40 transition-all duration-300"
    >
      <div className="bg-card/60 backdrop-blur-3xl p-4 h-full space-y-4">
        <span className="sr-only">{`Sign in with ${providerName}`}</span>
        <div>
          {createElement(icon, {
            size: 52,
            className: "mx-auto",
            color: "white",
          })}
        </div>
        <p className="font-bold text-center capitalize">{providerName}</p>
      </div>
      <div
        className={
          "absolute bottom-0 right-2 rounded-full h-20 w-20 -z-20 blur-xl bg-gray-500"
        }
      ></div>
    </button>
  );
}
