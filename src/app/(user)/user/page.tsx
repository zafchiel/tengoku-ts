import { redirect } from "next/navigation";
import { authConfig } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import ProgressSection from "@/components/profilePage/progressSection";
import { cn } from "@/lib/utils";

export default async function ProfilePage() {
  const session = await getServerSession(authConfig);

  if (!session?.user) redirect(`/api/auth/signin`);

  return (
    <main className={cn("p-3 flex flex-col md:pt-14")}>
      <section className="w-full text-right">
        <h1 className="text-6xl font-bold">{session.user?.name ?? "WELCOME"}</h1>
        <p className="text-muted-foreground">{session.user?.email}</p>
      </section>
      <div>
        <section className="mt-5">
          <ProgressSection user={session.user} />
        </section>
      </div>
    </main>
  );
}
