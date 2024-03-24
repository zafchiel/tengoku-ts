import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import { validateRequest } from "@/lib/server/auth";
import { LogoutForm } from "@/components/profilePage/logout-form";

export default async function ProfilePage() {
  const { user, session } = await validateRequest();

  if(!user || !session) {
    redirect("/login");
  }

  return (
    <main className={cn("p-3 flex flex-col md:pt-14 container")}>
      <section className="flex flex-wrap items-center justify-between">
        <h1 className="text-6xl font-bold">{user.username}</h1>
        <LogoutForm />
      </section>
    </main>
  );
}