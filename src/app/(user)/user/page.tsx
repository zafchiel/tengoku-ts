import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { lucia } from "@/lib/server/auth";
import { cn } from "@/lib/utils";
import { validateRequest } from "@/lib/server/auth";
import { Button } from "@/components/ui/button";

export default async function ProfilePage() {
  const { user, session } = await validateRequest();

  if(!user || !session) {
    redirect("/login");
  }

  return (
    <main className={cn("p-3 flex flex-col md:pt-14")}>
      <section className="w-full text-right">
        <h1 className="text-6xl font-bold">{user.username ?? "WELCOME"}</h1>
      </section>
      <div>
        <section className="mt-5">
          <form action={logout}>
            <Button variant="destructive">Sign Out</Button>
          </form>
          {/* <ProgressSection user={session.user} /> */}
        </section>
      </div>
    </main>
  );
}

async function logout(): Promise<ActionResult> {
	"use server";
	const { session } = await validateRequest();
	if (!session) {
		return {
			error: "Unauthorized"
		};
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/login");
}

interface ActionResult {
	error: string | null;
}
