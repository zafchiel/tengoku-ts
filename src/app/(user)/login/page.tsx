import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import AuthSection from "@/components/loginPage/auth-section";

export default async function SignInPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/user");
  }

  return (
    <main className="container grid min-h-screen items-center">
      <section>
        <header className="text-left">
          <h1 className="text-3xl md:text-6xl font-bold uppercase leading-none">
            Sign In
          </h1>
          <p className="text-muted-foreground leading-none mb-4">
            choose your favorite provider
          </p>
        </header>

        <AuthSection />
      </section>
    </main>
  );
}
