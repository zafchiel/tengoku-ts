import SignInButton from "@/components/signInPage/signInButton";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authConfig } from "@/pages/api/auth/[...nextauth]";
import EmailInput from "@/components/signInPage/emailInput";
import GoogleIcon from "@/components/signInPage/googleIcon";
import IconRedditCircle from "@/components/signInPage/iconReddit";
import IconDiscord from "@/components/signInPage/iconDiscrod";

export default async function SignInPage() {
  const session = await getServerSession(authConfig);

  if (session) redirect("/");

  return (
    <main className="flex flex-col h-screen mx-auto items-center justify-center max-w-xl">
      <div className="p-4 text-left w-full">
        <h1 className="text-6xl font-bold uppercase">Welcome!</h1>
        <p className="text-muted-foreground">
          use your favourite provider to login
        </p>
      </div>
      <section className="flex w-52 flex-col justify-center gap-5 md:w-full md:max-w-2xl">
        <SignInButton
          provider="google"
          className="flex w-full items-center justify-center gap-2"
        >
          <GoogleIcon height="1.75em" width="1.75em" />
          Sign-In with Google
        </SignInButton>
        <SignInButton
          provider="reddit"
          className="flex w-full items-center justify-center gap-2"
        >
          <IconRedditCircle height="1.75em" width="1.75em" />
          Sign-In with Reddit
        </SignInButton>
        <SignInButton
          provider="discord"
          className="flex w-full items-center justify-center gap-2"
        >
          <IconDiscord height="1.75em" width="1.75em" />
          Sign-In with Discord
        </SignInButton>
        <div className="w-full flex items-center gap-2 before:block before:h-px before:grow before:bg-primary after:block after:grow after:h-px after:bg-primary">
          OR
        </div>
        <p className="font-semibold text-xl">
          Sign in with magic link sent to your email
        </p>
        <EmailInput />
      </section>
    </main>
  );
}
