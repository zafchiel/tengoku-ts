import SignInButton from "@/components/signInPage/signInButton";
import EmailInput from "@/components/signInPage/emailInput";
import GoogleIcon from "@/components/signInPage/googleIcon";

export default async function SignInPage() {
  // const session = await getServerSession(authConfig);

  // if (session) redirect("/");

  return (
    <main className="flex flex-col h-screen mx-auto items-center justify-center max-w-xl">
      <div className="text-left w-full">
        <h1 className="text-6xl font-bold uppercase leading-none">Welcome!</h1>
        <p className="text-muted-foreground leading-none pb-5 pl-3">
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
        
        <div className="w-full flex items-center gap-2 before:block before:h-px before:grow before:bg-primary after:block after:grow after:h-px after:bg-primary">
          OR
        </div>
        <p className="font-semibold text-xl">
          Continue with email
        </p>
        <EmailInput />
      </section>
    </main>
  );
}
