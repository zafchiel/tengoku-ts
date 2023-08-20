import SignInButton from "@/components/signInPage/signInButton";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authConfig } from "@/pages/api/auth/[...nextauth]";

export default async function SignInPage() {
  const session = await getServerSession(authConfig);

  if (session) redirect("/");

  return (
    <main className="flex flex-col h-screen mx-auto items-center justify-center max-w-xl">
      <div className="p-4 text-left w-full">
        <h1 className="text-6xl font-bold uppercase">Welcome!</h1>
        <p className="text-muted-foreground">
          use your favorite provider to login
        </p>
      </div>
      <section className="flex w-52 flex-col items-center justify-center gap-5 md:w-full md:max-w-2xl">
        <SignInButton
          provider="google"
          className="flex w-full items-center justify-center gap-2"
        >
          Sign-In with Google
        </SignInButton>
        <SignInButton
          provider="reddit"
          className="flex w-full items-center justify-center gap-2"
        >
          Sign-In with Reddit
        </SignInButton>
        {/* <div className="flex w-full items-center justify-evenly gap-3 before:block before:h-px before:w-auto before:grow before:bg-primary after:block after:h-px after:w-auto after:grow after:bg-primary">
          OR
        </div>
        <SignInEmail /> */}
      </section>
    </main>
  );
}
