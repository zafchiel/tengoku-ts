import SignInButton from "@/components/signInPage/signInButton";
// import EmailInput from "@/components/signInPage/emailInput";
import GoogleIcon from "@/components/signInPage/googleIcon";
import { Github } from "lucide-react";
import { validateRequest } from "@/lib/server/auth";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default async function SignInPage() {
  const { user } = await validateRequest();

  if(user) {
    redirect("/");
  }

  return (
    <main className="container grid min-h-screen items-center">
      <section>
      <header className="text-left">
        <h1 className="text-3xl md:text-6xl font-bold uppercase leading-none">Welcome!</h1>
        <p className="text-muted-foreground leading-none pb-5 pl-3">
          use your favorite provider to login
        </p>
      </header>
      <div className="flex w-52 flex-col justify-center gap-5 md:w-full md:max-w-2xl">
        <a
          href="/api/login/github"
          className={cn(buttonVariants(), "flex items-center justify-center gap-2")}
        >
          <Github height="1.75em" width="1.75em" />
          Sign-In with GitHub
        </a>
        
        {/* <div className="w-full flex items-center gap-2 before:block before:h-px before:grow before:bg-primary after:block after:grow after:h-px after:bg-primary">
          OR
        </div>
        <p className="font-semibold text-xl">
          Continue with email
        </p>
        <EmailInput /> */}
      </div>
      </section>
    </main>
  );
}
