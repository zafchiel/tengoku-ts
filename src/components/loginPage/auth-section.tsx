"use client";

import { GithubIcon } from "./icons/github-icon";
import { DiscordIcon } from "./icons/discord-icon";
import { GoogleIcon } from "./icons/google-icon";
import { MalIcon } from "./icons/mal-icon";
import { OAuthLink } from "./oauth-link";

export default function AuthSection() {
  return (
    <section className="flex flex-col md:grid grid-cols-2 gap-4 max-w-xl">
      <OAuthLink providerName="google" icon={GoogleIcon} />
      {/* <OAuthLink providerName="discord" icon={DiscordIcon} /> */}

      {/* You can pass component reference with default props */}
      {/* <OAuthLink providerName="github" icon={GithubIcon} /> */}

      {/* Passing function to modify default props */}
      {/* <OAuthLink
        providerName="MyAnimeList"
        providerLink="mal"
        icon={(props) => <MalIcon className="mx-auto" {...props} />}
      /> */}
    </section>
  );
}
