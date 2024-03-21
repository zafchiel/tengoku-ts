import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import { validateRequest } from "@/lib/server/auth";
import { LogoutForm } from "@/components/profilePage/logout-button";

export default async function ProfilePage() {
  const { user, session } = await validateRequest();

  if(!user || !session) {
    redirect("/login");
  }

  return (
    <main className={cn("p-3 flex flex-col md:pt-14 container")}>
      <section className="w-full text-right">
        <h1 className="text-6xl font-bold">{user.username}</h1>
          <LogoutForm />
      </section>
      <div>
        <section className="mt-5">
          {/* <ProgressSection user={session.user} /> */}
        </section>
      </div>
    </main>
  );
}